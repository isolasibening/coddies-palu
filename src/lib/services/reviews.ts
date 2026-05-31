"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/services/auth";
import { normalizeProductStatusKey } from "@/lib/product-status";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Database, ProfileRow, ReviewRow } from "@/lib/types";

export type ProductReview = {
  id: string;
  transactionId: string;
  reviewerId: string;
  reviewerName: string;
  productAccuracyRating: number;
  hygieneRating: number;
  communicationRating: number;
  safetyRating: number;
  comment: string;
  averageRating: number;
  createdAt: string;
};

export type AccountReview = {
  id: string;
  role: "given" | "received";
  userName: string;
  comment: string;
  averageRating: number;
  createdAt: string;
};

export type ReviewActionState = {
  error: string | null;
  success: string | null;
};

type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];

const defaultReviewActionState: ReviewActionState = {
  error: null,
  success: null,
};

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readRating(formData: FormData, key: string) {
  const rating = Number(readFormValue(formData, key));

  return Number.isInteger(rating) && rating >= 1 && rating <= 5
    ? rating
    : null;
}

function mapReviewRow(
  row: ReviewRow,
  reviewers: Map<string, ProfileRow>,
): ProductReview {
  const reviewerId = row.reviewer_id ?? row.reviewerId ?? "";
  const productAccuracyRating =
    row.product_accuracy_rating ?? row.productAccuracyRating ?? 0;
  const hygieneRating = row.hygiene_rating ?? row.hygieneRating ?? 0;
  const communicationRating =
    row.communication_rating ?? row.communicationRating ?? 0;
  const safetyRating = row.safety_rating ?? row.safetyRating ?? 0;
  const averageRating =
    (productAccuracyRating +
      hygieneRating +
      communicationRating +
      safetyRating) /
    4;

  return {
    id: row.id,
    transactionId: row.transaction_id ?? row.transactionId ?? "",
    reviewerId,
    reviewerName: reviewers.get(reviewerId)?.name || "Pembeli Coddies",
    productAccuracyRating,
    hygieneRating,
    communicationRating,
    safetyRating,
    comment: row.comment ?? "",
    averageRating,
    createdAt: row.created_at ?? row.createdAt ?? "",
  };
}

async function getReviewerProfiles(reviewerIds: string[]) {
  if (reviewerIds.length === 0) {
    return new Map<string, ProfileRow>();
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .in("id", reviewerIds);

  if (error || !data) {
    return new Map<string, ProfileRow>();
  }

  return new Map(data.map((profile) => [profile.id, profile]));
}

export async function getProductReviews(
  productId: string,
): Promise<ProductReview[]> {
  if (!productId || !isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createServerSupabaseClient();
  const { data: transaction, error: transactionError } = await supabase
    .from("transactions")
    .select("id")
    .eq("product_id", productId)
    .eq("status", "completed")
    .maybeSingle();

  if (transactionError || !transaction) {
    return [];
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("transaction_id", transaction.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const reviewerIds = Array.from(
    new Set(
      data
        .map((review) => review.reviewer_id ?? review.reviewerId ?? "")
        .filter(Boolean),
    ),
  );
  const reviewers = await getReviewerProfiles(reviewerIds);

  return data.map((review) => mapReviewRow(review, reviewers));
}

export async function getAccountReviews(
  userId: string,
): Promise<{
  given: AccountReview[];
  received: AccountReview[];
}> {
  if (!userId || !isSupabaseConfigured()) {
    return { given: [], received: [] };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .or(`reviewer_id.eq.${userId},reviewed_user_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return { given: [], received: [] };
  }

  const profileIds = Array.from(
    new Set(
      data
        .flatMap((review) => [
          review.reviewer_id ?? review.reviewerId ?? "",
          review.reviewed_user_id ?? review.reviewedUserId ?? "",
        ])
        .filter(Boolean),
    ),
  );
  const profiles = await getReviewerProfiles(profileIds);

  function mapAccountReview(row: ReviewRow, role: "given" | "received") {
    const reviewerId = row.reviewer_id ?? row.reviewerId ?? "";
    const reviewedUserId = row.reviewed_user_id ?? row.reviewedUserId ?? "";
    const otherUserId = role === "given" ? reviewedUserId : reviewerId;
    const productAccuracyRating =
      row.product_accuracy_rating ?? row.productAccuracyRating ?? 0;
    const hygieneRating = row.hygiene_rating ?? row.hygieneRating ?? 0;
    const communicationRating =
      row.communication_rating ?? row.communicationRating ?? 0;
    const safetyRating = row.safety_rating ?? row.safetyRating ?? 0;

    return {
      id: row.id,
      role,
      userName: profiles.get(otherUserId)?.name || "Pengguna Coddies",
      comment: row.comment ?? "",
      averageRating:
        (productAccuracyRating +
          hygieneRating +
          communicationRating +
          safetyRating) /
        4,
      createdAt: row.created_at ?? row.createdAt ?? "",
    } satisfies AccountReview;
  }

  return {
    given: data
      .filter((review) => (review.reviewer_id ?? review.reviewerId) === userId)
      .map((review) => mapAccountReview(review, "given")),
    received: data
      .filter(
        (review) => (review.reviewed_user_id ?? review.reviewedUserId) === userId,
      )
      .map((review) => mapAccountReview(review, "received")),
  };
}

export async function createReviewAction(
  _previousState: ReviewActionState,
  formData: FormData,
): Promise<ReviewActionState> {
  if (!isSupabaseConfigured()) {
    return {
      ...defaultReviewActionState,
      error: "Supabase belum dikonfigurasi.",
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      ...defaultReviewActionState,
      error: "Login dulu untuk memberi review.",
    };
  }

  const productId = readFormValue(formData, "product_id");
  const productAccuracyRating = readRating(
    formData,
    "product_accuracy_rating",
  );
  const hygieneRating = readRating(formData, "hygiene_rating");
  const communicationRating = readRating(formData, "communication_rating");
  const safetyRating = readRating(formData, "safety_rating");
  const comment = readFormValue(formData, "comment");

  if (!productId) {
    return { ...defaultReviewActionState, error: "Produk tidak valid." };
  }

  if (
    !productAccuracyRating ||
    !hygieneRating ||
    !communicationRating ||
    !safetyRating
  ) {
    return {
      ...defaultReviewActionState,
      error: "Semua rating wajib bernilai 1 sampai 5.",
    };
  }

  if (!comment) {
    return { ...defaultReviewActionState, error: "Komentar wajib diisi." };
  }

  const supabase = await createServerSupabaseClient();
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, seller_id, status")
    .eq("id", productId)
    .maybeSingle();

  if (productError || !product) {
    return { ...defaultReviewActionState, error: "Produk tidak ditemukan." };
  }

  if (!product.seller_id) {
    return {
      ...defaultReviewActionState,
      error: "Data penjual produk belum lengkap.",
    };
  }

  if (product.seller_id === user.id) {
    return {
      ...defaultReviewActionState,
      error: "Penjual tidak bisa memberi review untuk produknya sendiri.",
    };
  }

  if (normalizeProductStatusKey(product.status) !== "sold") {
    return {
      ...defaultReviewActionState,
      error: "Review hanya bisa diberikan untuk produk yang sudah terjual.",
    };
  }

  const { data: transaction, error: transactionError } = await supabase
    .from("transactions")
    .select("id")
    .eq("product_id", productId)
    .eq("status", "completed")
    .maybeSingle();

  if (transactionError || !transaction) {
    return {
      ...defaultReviewActionState,
      error: "Transaksi produk belum tercatat.",
    };
  }

  const now = new Date().toISOString();
  const reviewPayload: ReviewInsert = {
    transaction_id: transaction.id,
    reviewer_id: user.id,
    reviewed_user_id: product.seller_id,
    product_accuracy_rating: productAccuracyRating,
    hygiene_rating: hygieneRating,
    communication_rating: communicationRating,
    safety_rating: safetyRating,
    comment,
    updated_at: now,
  };

  const { error } = await supabase.from("reviews").upsert(reviewPayload, {
    onConflict: "transaction_id,reviewer_id",
  });

  if (error) {
    return { ...defaultReviewActionState, error: error.message };
  }

  revalidatePath(`/products/${productId}`);
  revalidatePath("/account");
  revalidatePath("/account/reviews");

  return {
    error: null,
    success: "Review berhasil dikirim.",
  };
}
