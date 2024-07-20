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

-- CreateTable
CREATE TABLE "td_wallet_type" (
    "td_wallet_type_id" UUID NOT NULL,
    "td_wallet_type_name" VARCHAR(255) NOT NULL,
    "td_wallet_type_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_type_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_type_deleted_at" TIMESTAMPTZ,

    CONSTRAINT "td_wallet_type_pkey" PRIMARY KEY ("td_wallet_type_id")
);

-- CreateTable
CREATE TABLE "td_wallet" (
    "td_wallet_id" UUID NOT NULL,
    "td_wallet_user_id" UUID NOT NULL,
    "td_wallet_type_id" UUID NOT NULL,
    "td_wallet_balance" DECIMAL NOT NULL,
    "td_wallet_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_deleted_at" TIMESTAMPTZ,

    CONSTRAINT "td_wallet_pkey" PRIMARY KEY ("td_wallet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "td_user_td_user_email_key" ON "td_user"("td_user_email");

-- CreateIndex
CREATE UNIQUE INDEX "td_user_td_user_username_key" ON "td_user"("td_user_username");

-- CreateIndex
CREATE UNIQUE INDEX "td_wallet_type_td_wallet_type_name_key" ON "td_wallet_type"("td_wallet_type_name");

-- AddForeignKey
ALTER TABLE "td_wallet" ADD CONSTRAINT "td_wallet_td_wallet_type_id_fkey" FOREIGN KEY ("td_wallet_type_id") REFERENCES "td_wallet_type"("td_wallet_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "td_wallet" ADD CONSTRAINT "td_wallet_td_wallet_user_id_fkey" FOREIGN KEY ("td_wallet_user_id") REFERENCES "td_user"("td_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
