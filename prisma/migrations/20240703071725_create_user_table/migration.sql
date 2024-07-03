-- CreateTable
CREATE TABLE "td_user" (
    "td_user_id" TEXT NOT NULL,
    "td_user_email" TEXT NOT NULL,
    "td_user_username" TEXT NOT NULL,
    "td_user_passwoerd" TEXT NOT NULL,
    "td_user_phone" TEXT NOT NULL,
    "td_user_api_key" TEXT,
    "td_user_api_secret" TEXT,
    "td_user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_user_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "td_user_pkey" PRIMARY KEY ("td_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "td_user_td_user_email_key" ON "td_user"("td_user_email");

-- CreateIndex
CREATE UNIQUE INDEX "td_user_td_user_username_key" ON "td_user"("td_user_username");
