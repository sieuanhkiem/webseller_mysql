import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1698463594005 implements MigrationInterface {
    name = 'Setup1698463594005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Address" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_2af811645b80372a68cb19a1046" DEFAULT NEWSEQUENTIALID(), "Address_Code" nvarchar(100) NOT NULL, "Address_1" nvarchar(255), "Address_2" nvarchar(255), "Address_3" nvarchar(255), "Is_Delete" bit CONSTRAINT "DF_31a6ebfaa9401e56f32f79b2c5b" DEFAULT 0, "Create_Date" datetime CONSTRAINT "DF_05ce3cab5692f254066909602ce" DEFAULT getdate(), "cityId" uniqueidentifier, "districtId" uniqueidentifier, "wardId" uniqueidentifier, CONSTRAINT "UQ_8d5ee169e3180495b27cecc4832" UNIQUE ("Address_Code"), CONSTRAINT "PK_2af811645b80372a68cb19a1046" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Ward" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_aef8828d183e418b8a7f32f5a50" DEFAULT NEWSEQUENTIALID(), "Ward_Code" nvarchar(100) NOT NULL, "Ward_Name" nvarchar(255) NOT NULL, "Create_Date" datetime CONSTRAINT "DF_363526eb75467f281b06c67d6a7" DEFAULT getdate(), "districtId" uniqueidentifier, "cityId" uniqueidentifier, CONSTRAINT "UQ_4be134f151488ae31a8263306b9" UNIQUE ("Ward_Code"), CONSTRAINT "PK_aef8828d183e418b8a7f32f5a50" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "District" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_6dcc0f21c2adacf8c568c444f3c" DEFAULT NEWSEQUENTIALID(), "District_Code" nvarchar(100) NOT NULL, "District_Name" nvarchar(255) NOT NULL, "Create_Date" datetime CONSTRAINT "DF_43809c04899f2227b3e43ca7a21" DEFAULT getdate(), "cityId" uniqueidentifier, CONSTRAINT "UQ_08bdc6dc787ba82ce7e59c4cc88" UNIQUE ("District_Code"), CONSTRAINT "PK_6dcc0f21c2adacf8c568c444f3c" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "City" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_2909ede69e6899c1aa249d83053" DEFAULT NEWSEQUENTIALID(), "City_Code" nvarchar(100) NOT NULL, "City_Name" nvarchar(255) NOT NULL, "Create_Date" datetime CONSTRAINT "DF_04d5a7463df1b6308cc9ef81622" DEFAULT getdate(), CONSTRAINT "UQ_090de8cc080a13b95e31a0a5200" UNIQUE ("City_Code"), CONSTRAINT "PK_2909ede69e6899c1aa249d83053" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Employee" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_f0f4637f4649a2b0fb85335cd28" DEFAULT NEWSEQUENTIALID(), "Employee_Code" nvarchar(100) NOT NULL, "Employee_Name" nvarchar(255) NOT NULL, "Sex" nchar(10), "Start_Date" datetime CONSTRAINT "DF_c5d0e51b1c5bb106fb34575eb08" DEFAULT getdate(), "End_Date" datetime, "Birth_Day" nchar(10), "Position" nvarchar(50), "Is_Active" bit CONSTRAINT "DF_bf084699ad1a76cd7d9fdcdab8d" DEFAULT 1, "Is_Delete" bit CONSTRAINT "DF_0834a58f93ceb80529494c28cf5" DEFAULT 0, "Create_Date" datetime CONSTRAINT "DF_97515f337eb5aa4dafb99a1b31c" DEFAULT getdate(), CONSTRAINT "UQ_0f8a8c49cf37f4f7e1cd43fc5a8" UNIQUE ("Employee_Code"), CONSTRAINT "PK_f0f4637f4649a2b0fb85335cd28" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Shops" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_c43f7d58199fc0c3d3316b80679" DEFAULT NEWSEQUENTIALID(), "Shop_Code" nvarchar(100) NOT NULL, "Shop_Name" nvarchar(255) NOT NULL, "Tax" nvarchar(50), "Telephone" nvarchar(18), "Telephone1" nvarchar(18), "Slogan" nvarchar(100), "Create_Date" datetime CONSTRAINT "DF_7934b08881f0a4a89269e95f271" DEFAULT getdate(), "addressId" uniqueidentifier, CONSTRAINT "UQ_03262247e2d1c7da92ed00a4563" UNIQUE ("Shop_Code"), CONSTRAINT "PK_c43f7d58199fc0c3d3316b80679" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_a225ab2c5f2f55d3ef516c8b79" ON "Shops" ("addressId") WHERE "addressId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "Product_Color" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_585ba1fc04ff12199c8ae5c5d51" DEFAULT NEWSEQUENTIALID(), "Color_Code" nvarchar(100) NOT NULL, "Color_Name" nvarchar(255) NOT NULL, "Comment" nvarchar(255), "Create_Date" datetime CONSTRAINT "DF_d8e0c21d5b274a52eb229d6f286" DEFAULT getdate(), CONSTRAINT "UQ_5250b830fdc3d284bddc03bbe44" UNIQUE ("Color_Code"), CONSTRAINT "PK_585ba1fc04ff12199c8ae5c5d51" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Inventory" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_483a738f2ab8ea9a86cee4be9c9" DEFAULT NEWSEQUENTIALID(), "Inventory_Date" datetime CONSTRAINT "DF_3c34c2a063051cd5767462ef94a" DEFAULT getdate(), "Created_By" nvarchar(100) CONSTRAINT "DF_74bb7acb5bf9419f8a7d2779209" DEFAULT 'admin', "Create_Date" datetime CONSTRAINT "DF_0640fa9b7dbce63faf0e8a01c94" DEFAULT getdate(), "Quantity" numeric, "Amount" int, "Price" int NOT NULL, "Currenry" nvarchar(30) CONSTRAINT "DF_4032f58a501e503f020c4341c14" DEFAULT 'VNĐ', "Is_Delete" bit CONSTRAINT "DF_301a7c30fce9188998e136b3cab" DEFAULT 0, "productId" uniqueidentifier, "shopId" uniqueidentifier, "productColorId" uniqueidentifier, "productSizeId" uniqueidentifier, CONSTRAINT "PK_483a738f2ab8ea9a86cee4be9c9" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Sales_Price" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_6e2196e9b4f5ecd86af68aebdae" DEFAULT NEWSEQUENTIALID(), "Sale_Code" nvarchar(255) NOT NULL, "Sale_Price" int NOT NULL, "Curcency" nvarchar(100) CONSTRAINT "DF_9bbd6f989c268df2e58ce0a7a23" DEFAULT 'VNĐ', "Price_Date" datetime, "Created_By" nvarchar(100) CONSTRAINT "DF_c8ad7db243fe6409aa54f7ec3a2" DEFAULT 'admin', "Create_Date" datetime CONSTRAINT "DF_34525cc0c1252b15de7d888b3a7" DEFAULT getdate(), "Is_Delete" bit CONSTRAINT "DF_dba4c5e32aeed47f53fa7232108" DEFAULT 0, "Is_Active" bit, "productId" uniqueidentifier, "productSizeId" uniqueidentifier, CONSTRAINT "UQ_337b9a908fb717d627d257c5a2c" UNIQUE ("Sale_Code"), CONSTRAINT "PK_6e2196e9b4f5ecd86af68aebdae" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Product_Size" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_c5ab07a4a0fb5de66c56d0e9fdc" DEFAULT NEWSEQUENTIALID(), "Size_Code" nvarchar(100) NOT NULL, "Size_Name" nvarchar(255) NOT NULL, "Comment" nvarchar(255), "Is_Delete" bit CONSTRAINT "DF_7663a8089edeeceb9f501a561bf" DEFAULT 0, "Create_Date" datetime CONSTRAINT "DF_906282b5f884ec085142acf38ea" DEFAULT getdate(), "productId" uniqueidentifier, CONSTRAINT "UQ_6f53f82ea2e89c0e08e4f5a6331" UNIQUE ("Size_Code"), CONSTRAINT "PK_c5ab07a4a0fb5de66c56d0e9fdc" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Image" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_807f8bb4b3cbb1bed26a61929d7" DEFAULT NEWSEQUENTIALID(), "Image_Code" nvarchar(100) NOT NULL, "Image_Name" nvarchar(255) NOT NULL, "Image" image, "Image_Type" int, "Comment" nvarchar(255), "Is_Delete" bit CONSTRAINT "DF_df464d6d682d846db293ccc60c3" DEFAULT 0, "Create_Date" datetime CONSTRAINT "DF_304fdf76338ab284afc78d5fdff" DEFAULT getdate(), "Image_Default" bit CONSTRAINT "DF_f51f70344138bf1c4dcaee7deed" DEFAULT 0, CONSTRAINT "UQ_dcaa6ce0d1718339bb4f58f3d2f" UNIQUE ("Image_Code"), CONSTRAINT "PK_807f8bb4b3cbb1bed26a61929d7" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Image_Product" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_82ec55462a32df9f4de03610c37" DEFAULT NEWSEQUENTIALID(), "productId" uniqueidentifier, "imagesId" uniqueidentifier, CONSTRAINT "PK_82ec55462a32df9f4de03610c37" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_87913227409cfe7bf1f63cf99d" ON "Image_Product" ("imagesId") WHERE "imagesId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "Product_Category" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_8d71f1d7d8b499bda031378784f" DEFAULT NEWSEQUENTIALID(), "Category_Code" nvarchar(100) NOT NULL, "Category_Name" nvarchar(255) NOT NULL, "Create_Date" datetime CONSTRAINT "DF_be9b3434382384136c0ac68f97f" DEFAULT getdate(), "Is_Active" bit CONSTRAINT "DF_eed7792826d494ab07561f4d6bc" DEFAULT 1, "Is_Delete" bit CONSTRAINT "DF_34fdb7d3878bd86d66c1ce66a1c" DEFAULT 0, CONSTRAINT "UQ_cb2b7b8da917f30f6b09015c89c" UNIQUE ("Category_Code"), CONSTRAINT "PK_8d71f1d7d8b499bda031378784f" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Product" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_b9e83eb0041db584b3a0762a035" DEFAULT NEWSEQUENTIALID(), "Product_Code" nvarchar(100) NOT NULL, "Product_Name" nvarchar(255) NOT NULL, "Product_Type" nvarchar(50), "Product_Group" nvarchar(50), "Brand" nvarchar(50), "Comment" nvarchar(255), "Preserve" nvarchar(255), "Is_Delete" bit CONSTRAINT "DF_c99ae7315ea3449ca0df104bf77" DEFAULT 0, "Create_Date" datetime CONSTRAINT "DF_589dee5548ec9cf76580dd6aafa" DEFAULT getdate(), "categoryProductId" uniqueidentifier, CONSTRAINT "UQ_b83c942e4f059e9792af7c39343" UNIQUE ("Product_Code"), CONSTRAINT "PK_b9e83eb0041db584b3a0762a035" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Sales_Order" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_ce3a56461c92ef16dfb84be04ae" DEFAULT NEWSEQUENTIALID(), "Sale_Order_Code" nvarchar(100) NOT NULL, "Sale_Date" datetime CONSTRAINT "DF_76973005e00126ee2048ac71295" DEFAULT getdate(), "Delivery_Date" datetime, "Created_By" nvarchar(100) CONSTRAINT "DF_da4eafce8298fdc68ea802949be" DEFAULT 'admin', "Create_Date" datetime CONSTRAINT "DF_8208f264a197c13c4091fb7b70c" DEFAULT getdate(), "Last_Update" datetime CONSTRAINT "DF_edcf9457bf0981c8d8b4a314b3f" DEFAULT getdate(), "Quantity" int, "Amount" int, "Tax" int CONSTRAINT "DF_8d9afa740b7070f6bd92cc9c3f6" DEFAULT 5, "Transport_Fee" bit CONSTRAINT "DF_eaf896639f826e5ade235143260" DEFAULT 0, "Salesman" nvarchar(100) NOT NULL CONSTRAINT "DF_187ed6960aae95c2ff033dadeb1" DEFAULT 'admin', "Is_Delete" bit CONSTRAINT "DF_3a61b573ecd890edad8b0ba053b" DEFAULT 0, "Is_Cancle" bit CONSTRAINT "DF_283de07a91b077701dea775c297" DEFAULT 0, "status" int CONSTRAINT "DF_bccc3f062bb7927624206b5e3ba" DEFAULT 1, "productId" uniqueidentifier, "productSizeId" uniqueidentifier, "inventoryId" uniqueidentifier, "customerId" uniqueidentifier, CONSTRAINT "PK_ce3a56461c92ef16dfb84be04ae" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Customer" ("Id" uniqueidentifier NOT NULL CONSTRAINT "DF_cf3de828ba34319b20feedde6e3" DEFAULT NEWSEQUENTIALID(), "Customer_Code" nvarchar(100), "Customer_Name" nvarchar(255), "Age" numeric, "Sex" bit CONSTRAINT "DF_6e5f1892125c67bfe01faabe318" DEFAULT 0, "Job" nvarchar(255), "Telephone1" nvarchar(18), "Telephone2" nvarchar(18), "Is_Delete" bit CONSTRAINT "DF_beae3011adb717a4dba1b48e160" DEFAULT 0, "Create_Date" datetime CONSTRAINT "DF_9e9200d372d899d80e063208a78" DEFAULT getdate(), "addressId" uniqueidentifier, CONSTRAINT "UQ_21c6210d53205f4bc2708cf7e3c" UNIQUE ("Customer_Code"), CONSTRAINT "PK_cf3de828ba34319b20feedde6e3" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_bfcaf3bb2e68d276d27dc09715" ON "Customer" ("addressId") WHERE "addressId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "product_product_colors_product_color" ("productId" uniqueidentifier NOT NULL, "productColorId" uniqueidentifier NOT NULL, CONSTRAINT "PK_d8da45641a37770158e841cea76" PRIMARY KEY ("productId", "productColorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_269f46f0691fb67c75eed2d6ad" ON "product_product_colors_product_color" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_93e2eb96d2e35105bae022a5bc" ON "product_product_colors_product_color" ("productColorId") `);
        await queryRunner.query(`ALTER TABLE "Address" ADD CONSTRAINT "FK_0bdb91688cf3aff629a0c03aea3" FOREIGN KEY ("cityId") REFERENCES "City"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Address" ADD CONSTRAINT "FK_2791cd39615ad22eb75e7282441" FOREIGN KEY ("districtId") REFERENCES "District"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Address" ADD CONSTRAINT "FK_20ad1a792e935178df2d32425c5" FOREIGN KEY ("wardId") REFERENCES "Ward"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Ward" ADD CONSTRAINT "FK_520b446eae8c1ef2fe9e94884c7" FOREIGN KEY ("districtId") REFERENCES "District"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Ward" ADD CONSTRAINT "FK_96cb4c89dbec151f911d6c2e15d" FOREIGN KEY ("cityId") REFERENCES "City"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "District" ADD CONSTRAINT "FK_d5a2c172dd63faf788760c6e02e" FOREIGN KEY ("cityId") REFERENCES "City"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Shops" ADD CONSTRAINT "FK_a225ab2c5f2f55d3ef516c8b79e" FOREIGN KEY ("addressId") REFERENCES "Address"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Inventory" ADD CONSTRAINT "FK_ee31e197600c81513a46cc61636" FOREIGN KEY ("productId") REFERENCES "Product"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Inventory" ADD CONSTRAINT "FK_e23137b90f5d28dd7b1ec096536" FOREIGN KEY ("shopId") REFERENCES "Shops"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Inventory" ADD CONSTRAINT "FK_5d04c083ef63fca7c5416ff11fb" FOREIGN KEY ("productColorId") REFERENCES "Product_Color"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Inventory" ADD CONSTRAINT "FK_fd625964dca904e0d6d027baf47" FOREIGN KEY ("productSizeId") REFERENCES "Product_Size"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sales_Price" ADD CONSTRAINT "FK_10dad5fa036faf2fec718e93a27" FOREIGN KEY ("productId") REFERENCES "Product"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sales_Price" ADD CONSTRAINT "FK_aa04cf59d1269cd79f067d1c463" FOREIGN KEY ("productSizeId") REFERENCES "Product_Size"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product_Size" ADD CONSTRAINT "FK_fdc546b7be723e9652b6fc13f2d" FOREIGN KEY ("productId") REFERENCES "Product"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Image_Product" ADD CONSTRAINT "FK_aca044bb96d091a203cb397298e" FOREIGN KEY ("productId") REFERENCES "Product"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Image_Product" ADD CONSTRAINT "FK_87913227409cfe7bf1f63cf99da" FOREIGN KEY ("imagesId") REFERENCES "Image"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Product" ADD CONSTRAINT "FK_9ddfe97f40677c8f9de67c7e5d7" FOREIGN KEY ("categoryProductId") REFERENCES "Product_Category"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sales_Order" ADD CONSTRAINT "FK_731147977908896aa177a03cdb5" FOREIGN KEY ("productId") REFERENCES "Product"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sales_Order" ADD CONSTRAINT "FK_84a0054461d134ff4be6af1dd87" FOREIGN KEY ("productSizeId") REFERENCES "Product_Size"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sales_Order" ADD CONSTRAINT "FK_6dcd75145ff2a6803694c39e24b" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sales_Order" ADD CONSTRAINT "FK_aa5fb85335b0fbfd646d46aed55" FOREIGN KEY ("customerId") REFERENCES "Customer"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Customer" ADD CONSTRAINT "FK_bfcaf3bb2e68d276d27dc09715a" FOREIGN KEY ("addressId") REFERENCES "Address"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_product_colors_product_color" ADD CONSTRAINT "FK_269f46f0691fb67c75eed2d6ad0" FOREIGN KEY ("productId") REFERENCES "Product"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_product_colors_product_color" ADD CONSTRAINT "FK_93e2eb96d2e35105bae022a5bc0" FOREIGN KEY ("productColorId") REFERENCES "Product_Color"("Id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_product_colors_product_color" DROP CONSTRAINT "FK_93e2eb96d2e35105bae022a5bc0"`);
        await queryRunner.query(`ALTER TABLE "product_product_colors_product_color" DROP CONSTRAINT "FK_269f46f0691fb67c75eed2d6ad0"`);
        await queryRunner.query(`ALTER TABLE "Customer" DROP CONSTRAINT "FK_bfcaf3bb2e68d276d27dc09715a"`);
        await queryRunner.query(`ALTER TABLE "Sales_Order" DROP CONSTRAINT "FK_aa5fb85335b0fbfd646d46aed55"`);
        await queryRunner.query(`ALTER TABLE "Sales_Order" DROP CONSTRAINT "FK_6dcd75145ff2a6803694c39e24b"`);
        await queryRunner.query(`ALTER TABLE "Sales_Order" DROP CONSTRAINT "FK_84a0054461d134ff4be6af1dd87"`);
        await queryRunner.query(`ALTER TABLE "Sales_Order" DROP CONSTRAINT "FK_731147977908896aa177a03cdb5"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP CONSTRAINT "FK_9ddfe97f40677c8f9de67c7e5d7"`);
        await queryRunner.query(`ALTER TABLE "Image_Product" DROP CONSTRAINT "FK_87913227409cfe7bf1f63cf99da"`);
        await queryRunner.query(`ALTER TABLE "Image_Product" DROP CONSTRAINT "FK_aca044bb96d091a203cb397298e"`);
        await queryRunner.query(`ALTER TABLE "Product_Size" DROP CONSTRAINT "FK_fdc546b7be723e9652b6fc13f2d"`);
        await queryRunner.query(`ALTER TABLE "Sales_Price" DROP CONSTRAINT "FK_aa04cf59d1269cd79f067d1c463"`);
        await queryRunner.query(`ALTER TABLE "Sales_Price" DROP CONSTRAINT "FK_10dad5fa036faf2fec718e93a27"`);
        await queryRunner.query(`ALTER TABLE "Inventory" DROP CONSTRAINT "FK_fd625964dca904e0d6d027baf47"`);
        await queryRunner.query(`ALTER TABLE "Inventory" DROP CONSTRAINT "FK_5d04c083ef63fca7c5416ff11fb"`);
        await queryRunner.query(`ALTER TABLE "Inventory" DROP CONSTRAINT "FK_e23137b90f5d28dd7b1ec096536"`);
        await queryRunner.query(`ALTER TABLE "Inventory" DROP CONSTRAINT "FK_ee31e197600c81513a46cc61636"`);
        await queryRunner.query(`ALTER TABLE "Shops" DROP CONSTRAINT "FK_a225ab2c5f2f55d3ef516c8b79e"`);
        await queryRunner.query(`ALTER TABLE "District" DROP CONSTRAINT "FK_d5a2c172dd63faf788760c6e02e"`);
        await queryRunner.query(`ALTER TABLE "Ward" DROP CONSTRAINT "FK_96cb4c89dbec151f911d6c2e15d"`);
        await queryRunner.query(`ALTER TABLE "Ward" DROP CONSTRAINT "FK_520b446eae8c1ef2fe9e94884c7"`);
        await queryRunner.query(`ALTER TABLE "Address" DROP CONSTRAINT "FK_20ad1a792e935178df2d32425c5"`);
        await queryRunner.query(`ALTER TABLE "Address" DROP CONSTRAINT "FK_2791cd39615ad22eb75e7282441"`);
        await queryRunner.query(`ALTER TABLE "Address" DROP CONSTRAINT "FK_0bdb91688cf3aff629a0c03aea3"`);
        await queryRunner.query(`DROP INDEX "IDX_93e2eb96d2e35105bae022a5bc" ON "product_product_colors_product_color"`);
        await queryRunner.query(`DROP INDEX "IDX_269f46f0691fb67c75eed2d6ad" ON "product_product_colors_product_color"`);
        await queryRunner.query(`DROP TABLE "product_product_colors_product_color"`);
        await queryRunner.query(`DROP INDEX "REL_bfcaf3bb2e68d276d27dc09715" ON "Customer"`);
        await queryRunner.query(`DROP TABLE "Customer"`);
        await queryRunner.query(`DROP TABLE "Sales_Order"`);
        await queryRunner.query(`DROP TABLE "Product"`);
        await queryRunner.query(`DROP TABLE "Product_Category"`);
        await queryRunner.query(`DROP INDEX "REL_87913227409cfe7bf1f63cf99d" ON "Image_Product"`);
        await queryRunner.query(`DROP TABLE "Image_Product"`);
        await queryRunner.query(`DROP TABLE "Image"`);
        await queryRunner.query(`DROP TABLE "Product_Size"`);
        await queryRunner.query(`DROP TABLE "Sales_Price"`);
        await queryRunner.query(`DROP TABLE "Inventory"`);
        await queryRunner.query(`DROP TABLE "Product_Color"`);
        await queryRunner.query(`DROP INDEX "REL_a225ab2c5f2f55d3ef516c8b79" ON "Shops"`);
        await queryRunner.query(`DROP TABLE "Shops"`);
        await queryRunner.query(`DROP TABLE "Employee"`);
        await queryRunner.query(`DROP TABLE "City"`);
        await queryRunner.query(`DROP TABLE "District"`);
        await queryRunner.query(`DROP TABLE "Ward"`);
        await queryRunner.query(`DROP TABLE "Address"`);
    }

}
