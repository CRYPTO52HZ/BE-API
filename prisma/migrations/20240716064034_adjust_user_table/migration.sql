-- CreateTable
CREATE TABLE "td_user" (
    "td_user_id" UUID NOT NULL,
    "td_user_email" VARCHAR(255) NOT NULL,
    "td_user_username" VARCHAR(255) NOT NULL,
    "td_user_passwoerd" VARCHAR(255) NOT NULL,
    "td_user_phone" VARCHAR(15) NOT NULL,
    "td_user_api_key" VARCHAR(255),
    "td_user_api_secret" VARCHAR(255),
    "td_user_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_user_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_user_deleted_at" TIMESTAMPTZ,
    "td_user_is_active" BOOLEAN NOT NULL DEFAULT false,
    "td_user_timezone_code" VARCHAR(255),

    CONSTRAINT "td_user_pkey" PRIMARY KEY ("td_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "td_user_td_user_email_key" ON "td_user"("td_user_email");

-- CreateIndex
CREATE UNIQUE INDEX "td_user_td_user_username_key" ON "td_user"("td_user_username");
