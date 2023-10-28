import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1698496584726 implements MigrationInterface {
    name = 'Setup1698496584726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Ward\` (\`Id\` varchar(36) NOT NULL, \`Ward_Code\` varchar(100) NOT NULL, \`Ward_Name\` varchar(255) NOT NULL, \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`districtId\` char(36) NULL, \`cityId\` char(36) NULL, UNIQUE INDEX \`IDX_4be134f151488ae31a8263306b\` (\`Ward_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`District\` (\`Id\` varchar(36) NOT NULL, \`District_Code\` varchar(100) NOT NULL, \`District_Name\` varchar(255) NOT NULL, \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`cityId\` char(36) NULL, UNIQUE INDEX \`IDX_08bdc6dc787ba82ce7e59c4cc8\` (\`District_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`City\` (\`Id\` varchar(36) NOT NULL, \`City_Code\` varchar(100) NOT NULL, \`City_Name\` varchar(255) NOT NULL, \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_090de8cc080a13b95e31a0a520\` (\`City_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Address\` (\`Id\` varchar(36) NOT NULL, \`Address_Code\` varchar(100) NOT NULL, \`Address_1\` varchar(255) NULL, \`Address_2\` varchar(255) NULL, \`Address_3\` varchar(255) NULL, \`Is_Delete\` tinyint NULL DEFAULT '0', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`cityId\` char(36) NULL, \`districtId\` char(36) NULL, \`wardId\` char(36) NULL, UNIQUE INDEX \`IDX_8d5ee169e3180495b27cecc483\` (\`Address_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Shops\` (\`Id\` varchar(36) NOT NULL, \`Shop_Code\` varchar(100) NOT NULL, \`Shop_Name\` varchar(255) NOT NULL, \`Tax\` varchar(50) NULL, \`Telephone\` varchar(18) NULL, \`Telephone1\` varchar(18) NULL, \`Slogan\` varchar(100) NULL, \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`addressId\` char(36) NULL, UNIQUE INDEX \`IDX_03262247e2d1c7da92ed00a456\` (\`Shop_Code\`), UNIQUE INDEX \`REL_a225ab2c5f2f55d3ef516c8b79\` (\`addressId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product_Color\` (\`Id\` varchar(36) NOT NULL, \`Color_Code\` varchar(100) NOT NULL, \`Color_Name\` varchar(255) NOT NULL, \`Comment\` varchar(255) NULL, \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_5250b830fdc3d284bddc03bbe4\` (\`Color_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Inventory\` (\`Id\` varchar(36) NOT NULL, \`Inventory_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`Created_By\` varchar(100) NULL DEFAULT 'admin', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`Quantity\` decimal UNSIGNED NULL, \`Amount\` int UNSIGNED NULL, \`Price\` int UNSIGNED NOT NULL, \`Currenry\` varchar(30) NULL DEFAULT 'VNĐ', \`Is_Delete\` tinyint NULL DEFAULT '0', \`productId\` char(36) NULL, \`shopId\` char(36) NULL, \`productColorId\` char(36) NULL, \`productSizeId\` char(36) NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Sales_Price\` (\`Id\` varchar(36) NOT NULL, \`Sale_Code\` varchar(255) NOT NULL, \`Sale_Price\` int UNSIGNED NOT NULL, \`Curcency\` varchar(100) NULL DEFAULT 'VNĐ', \`Price_Date\` datetime NULL, \`Created_By\` varchar(100) NULL DEFAULT 'admin', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`Is_Delete\` tinyint NULL DEFAULT '0', \`Is_Active\` tinyint NULL DEFAULT '1', \`productId\` char(36) NULL, \`productSizeId\` char(36) NULL, UNIQUE INDEX \`IDX_337b9a908fb717d627d257c5a2\` (\`Sale_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product_Size\` (\`Id\` varchar(36) NOT NULL, \`Size_Code\` varchar(100) NOT NULL, \`Size_Name\` varchar(255) NOT NULL, \`Comment\` varchar(255) NULL, \`Is_Delete\` tinyint NULL DEFAULT '0', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`productId\` char(36) NULL, UNIQUE INDEX \`IDX_6f53f82ea2e89c0e08e4f5a633\` (\`Size_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Image\` (\`Id\` varchar(36) NOT NULL, \`Image_Code\` varchar(100) NOT NULL, \`Image_Name\` varchar(255) NOT NULL, \`Image\` longblob NULL, \`Image_Type\` int UNSIGNED NULL, \`Comment\` varchar(255) NULL, \`Is_Delete\` tinyint NULL DEFAULT '0', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`Image_Default\` tinyint NULL DEFAULT '0', UNIQUE INDEX \`IDX_dcaa6ce0d1718339bb4f58f3d2\` (\`Image_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Image_Product\` (\`Id\` varchar(36) NOT NULL, \`productId\` char(36) NULL, \`imagesId\` char(36) NULL, UNIQUE INDEX \`REL_87913227409cfe7bf1f63cf99d\` (\`imagesId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product_Category\` (\`Id\` varchar(36) NOT NULL, \`Category_Code\` varchar(100) NOT NULL, \`Category_Name\` varchar(255) NOT NULL, \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`Is_Active\` tinyint NULL DEFAULT '1', \`Is_Delete\` tinyint NULL DEFAULT '0', UNIQUE INDEX \`IDX_cb2b7b8da917f30f6b09015c89\` (\`Category_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product\` (\`Id\` varchar(36) NOT NULL, \`Product_Code\` varchar(100) NOT NULL, \`Product_Name\` varchar(255) NOT NULL, \`Product_Type\` varchar(50) NULL, \`Product_Group\` varchar(50) NULL, \`Brand\` varchar(255) NULL, \`Comment\` varchar(255) NULL, \`Preserve\` varchar(255) NULL, \`Is_Delete\` tinyint NULL DEFAULT '0', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`categoryProductId\` char(36) NULL, UNIQUE INDEX \`IDX_b83c942e4f059e9792af7c3934\` (\`Product_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Sales_Order\` (\`Id\` varchar(36) NOT NULL, \`Sale_Order_Code\` varchar(100) NOT NULL, \`Sale_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`Delivery_Date\` datetime NULL, \`Created_By\` varchar(100) NULL DEFAULT 'admin', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`Last_Update\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`Quantity\` int UNSIGNED NULL, \`Amount\` int UNSIGNED NULL, \`Tax\` int UNSIGNED NULL DEFAULT '5', \`Transport_Fee\` tinyint NULL DEFAULT '0', \`Salesman\` varchar(100) NOT NULL DEFAULT 'admin', \`Is_Delete\` tinyint NULL DEFAULT '0', \`Is_Cancle\` tinyint NULL DEFAULT '0', \`status\` int NULL DEFAULT '1', \`productId\` char(36) NULL, \`productSizeId\` char(36) NULL, \`inventoryId\` char(36) NULL, \`customerId\` char(36) NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Customer\` (\`Id\` varchar(36) NOT NULL, \`Customer_Code\` varchar(100) NULL, \`Customer_Name\` varchar(255) NULL, \`Age\` decimal UNSIGNED NULL, \`Sex\` tinyint NULL DEFAULT '0', \`Job\` varchar(255) NULL, \`Telephone1\` varchar(18) NULL, \`Telephone2\` varchar(18) NULL, \`Is_Delete\` tinyint NULL DEFAULT '0', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`addressId\` char(36) NULL, UNIQUE INDEX \`IDX_21c6210d53205f4bc2708cf7e3\` (\`Customer_Code\`), UNIQUE INDEX \`REL_bfcaf3bb2e68d276d27dc09715\` (\`addressId\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Employee\` (\`Id\` varchar(36) NOT NULL, \`Employee_Code\` varchar(100) NOT NULL, \`Employee_Name\` varchar(255) NOT NULL, \`Sex\` char(10) NULL, \`Start_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`End_Date\` datetime NULL, \`Birth_Day\` char(10) NULL, \`Position\` varchar(50) NULL, \`Is_Active\` tinyint NULL DEFAULT '1', \`Is_Delete\` tinyint NULL DEFAULT '0', \`Create_Date\` datetime NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_0f8a8c49cf37f4f7e1cd43fc5a\` (\`Employee_Code\`), PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_product_colors_product_color\` (\`productId\` char(36) NOT NULL, \`productColorId\` char(36) NOT NULL, INDEX \`IDX_269f46f0691fb67c75eed2d6ad\` (\`productId\`), INDEX \`IDX_93e2eb96d2e35105bae022a5bc\` (\`productColorId\`), PRIMARY KEY (\`productId\`, \`productColorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Ward\` ADD CONSTRAINT \`FK_520b446eae8c1ef2fe9e94884c7\` FOREIGN KEY (\`districtId\`) REFERENCES \`District\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Ward\` ADD CONSTRAINT \`FK_96cb4c89dbec151f911d6c2e15d\` FOREIGN KEY (\`cityId\`) REFERENCES \`City\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`District\` ADD CONSTRAINT \`FK_d5a2c172dd63faf788760c6e02e\` FOREIGN KEY (\`cityId\`) REFERENCES \`City\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_0bdb91688cf3aff629a0c03aea3\` FOREIGN KEY (\`cityId\`) REFERENCES \`City\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_2791cd39615ad22eb75e7282441\` FOREIGN KEY (\`districtId\`) REFERENCES \`District\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_20ad1a792e935178df2d32425c5\` FOREIGN KEY (\`wardId\`) REFERENCES \`Ward\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Shops\` ADD CONSTRAINT \`FK_a225ab2c5f2f55d3ef516c8b79e\` FOREIGN KEY (\`addressId\`) REFERENCES \`Address\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Inventory\` ADD CONSTRAINT \`FK_ee31e197600c81513a46cc61636\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Inventory\` ADD CONSTRAINT \`FK_e23137b90f5d28dd7b1ec096536\` FOREIGN KEY (\`shopId\`) REFERENCES \`Shops\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Inventory\` ADD CONSTRAINT \`FK_5d04c083ef63fca7c5416ff11fb\` FOREIGN KEY (\`productColorId\`) REFERENCES \`Product_Color\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Inventory\` ADD CONSTRAINT \`FK_fd625964dca904e0d6d027baf47\` FOREIGN KEY (\`productSizeId\`) REFERENCES \`Product_Size\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Sales_Price\` ADD CONSTRAINT \`FK_10dad5fa036faf2fec718e93a27\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Sales_Price\` ADD CONSTRAINT \`FK_aa04cf59d1269cd79f067d1c463\` FOREIGN KEY (\`productSizeId\`) REFERENCES \`Product_Size\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Product_Size\` ADD CONSTRAINT \`FK_fdc546b7be723e9652b6fc13f2d\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Image_Product\` ADD CONSTRAINT \`FK_aca044bb96d091a203cb397298e\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Image_Product\` ADD CONSTRAINT \`FK_87913227409cfe7bf1f63cf99da\` FOREIGN KEY (\`imagesId\`) REFERENCES \`Image\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Product\` ADD CONSTRAINT \`FK_9ddfe97f40677c8f9de67c7e5d7\` FOREIGN KEY (\`categoryProductId\`) REFERENCES \`Product_Category\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Sales_Order\` ADD CONSTRAINT \`FK_731147977908896aa177a03cdb5\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`Id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Sales_Order\` ADD CONSTRAINT \`FK_84a0054461d134ff4be6af1dd87\` FOREIGN KEY (\`productSizeId\`) REFERENCES \`Product_Size\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Sales_Order\` ADD CONSTRAINT \`FK_6dcd75145ff2a6803694c39e24b\` FOREIGN KEY (\`inventoryId\`) REFERENCES \`Inventory\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Sales_Order\` ADD CONSTRAINT \`FK_aa5fb85335b0fbfd646d46aed55\` FOREIGN KEY (\`customerId\`) REFERENCES \`Customer\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Customer\` ADD CONSTRAINT \`FK_bfcaf3bb2e68d276d27dc09715a\` FOREIGN KEY (\`addressId\`) REFERENCES \`Address\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_product_colors_product_color\` ADD CONSTRAINT \`FK_269f46f0691fb67c75eed2d6ad0\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`Id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_product_colors_product_color\` ADD CONSTRAINT \`FK_93e2eb96d2e35105bae022a5bc0\` FOREIGN KEY (\`productColorId\`) REFERENCES \`Product_Color\`(\`Id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_product_colors_product_color\` DROP FOREIGN KEY \`FK_93e2eb96d2e35105bae022a5bc0\``);
        await queryRunner.query(`ALTER TABLE \`product_product_colors_product_color\` DROP FOREIGN KEY \`FK_269f46f0691fb67c75eed2d6ad0\``);
        await queryRunner.query(`ALTER TABLE \`Customer\` DROP FOREIGN KEY \`FK_bfcaf3bb2e68d276d27dc09715a\``);
        await queryRunner.query(`ALTER TABLE \`Sales_Order\` DROP FOREIGN KEY \`FK_aa5fb85335b0fbfd646d46aed55\``);
        await queryRunner.query(`ALTER TABLE \`Sales_Order\` DROP FOREIGN KEY \`FK_6dcd75145ff2a6803694c39e24b\``);
        await queryRunner.query(`ALTER TABLE \`Sales_Order\` DROP FOREIGN KEY \`FK_84a0054461d134ff4be6af1dd87\``);
        await queryRunner.query(`ALTER TABLE \`Sales_Order\` DROP FOREIGN KEY \`FK_731147977908896aa177a03cdb5\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_9ddfe97f40677c8f9de67c7e5d7\``);
        await queryRunner.query(`ALTER TABLE \`Image_Product\` DROP FOREIGN KEY \`FK_87913227409cfe7bf1f63cf99da\``);
        await queryRunner.query(`ALTER TABLE \`Image_Product\` DROP FOREIGN KEY \`FK_aca044bb96d091a203cb397298e\``);
        await queryRunner.query(`ALTER TABLE \`Product_Size\` DROP FOREIGN KEY \`FK_fdc546b7be723e9652b6fc13f2d\``);
        await queryRunner.query(`ALTER TABLE \`Sales_Price\` DROP FOREIGN KEY \`FK_aa04cf59d1269cd79f067d1c463\``);
        await queryRunner.query(`ALTER TABLE \`Sales_Price\` DROP FOREIGN KEY \`FK_10dad5fa036faf2fec718e93a27\``);
        await queryRunner.query(`ALTER TABLE \`Inventory\` DROP FOREIGN KEY \`FK_fd625964dca904e0d6d027baf47\``);
        await queryRunner.query(`ALTER TABLE \`Inventory\` DROP FOREIGN KEY \`FK_5d04c083ef63fca7c5416ff11fb\``);
        await queryRunner.query(`ALTER TABLE \`Inventory\` DROP FOREIGN KEY \`FK_e23137b90f5d28dd7b1ec096536\``);
        await queryRunner.query(`ALTER TABLE \`Inventory\` DROP FOREIGN KEY \`FK_ee31e197600c81513a46cc61636\``);
        await queryRunner.query(`ALTER TABLE \`Shops\` DROP FOREIGN KEY \`FK_a225ab2c5f2f55d3ef516c8b79e\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_20ad1a792e935178df2d32425c5\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_2791cd39615ad22eb75e7282441\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_0bdb91688cf3aff629a0c03aea3\``);
        await queryRunner.query(`ALTER TABLE \`District\` DROP FOREIGN KEY \`FK_d5a2c172dd63faf788760c6e02e\``);
        await queryRunner.query(`ALTER TABLE \`Ward\` DROP FOREIGN KEY \`FK_96cb4c89dbec151f911d6c2e15d\``);
        await queryRunner.query(`ALTER TABLE \`Ward\` DROP FOREIGN KEY \`FK_520b446eae8c1ef2fe9e94884c7\``);
        await queryRunner.query(`DROP INDEX \`IDX_93e2eb96d2e35105bae022a5bc\` ON \`product_product_colors_product_color\``);
        await queryRunner.query(`DROP INDEX \`IDX_269f46f0691fb67c75eed2d6ad\` ON \`product_product_colors_product_color\``);
        await queryRunner.query(`DROP TABLE \`product_product_colors_product_color\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f8a8c49cf37f4f7e1cd43fc5a\` ON \`Employee\``);
        await queryRunner.query(`DROP TABLE \`Employee\``);
        await queryRunner.query(`DROP INDEX \`REL_bfcaf3bb2e68d276d27dc09715\` ON \`Customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_21c6210d53205f4bc2708cf7e3\` ON \`Customer\``);
        await queryRunner.query(`DROP TABLE \`Customer\``);
        await queryRunner.query(`DROP TABLE \`Sales_Order\``);
        await queryRunner.query(`DROP INDEX \`IDX_b83c942e4f059e9792af7c3934\` ON \`Product\``);
        await queryRunner.query(`DROP TABLE \`Product\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb2b7b8da917f30f6b09015c89\` ON \`Product_Category\``);
        await queryRunner.query(`DROP TABLE \`Product_Category\``);
        await queryRunner.query(`DROP INDEX \`REL_87913227409cfe7bf1f63cf99d\` ON \`Image_Product\``);
        await queryRunner.query(`DROP TABLE \`Image_Product\``);
        await queryRunner.query(`DROP INDEX \`IDX_dcaa6ce0d1718339bb4f58f3d2\` ON \`Image\``);
        await queryRunner.query(`DROP TABLE \`Image\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f53f82ea2e89c0e08e4f5a633\` ON \`Product_Size\``);
        await queryRunner.query(`DROP TABLE \`Product_Size\``);
        await queryRunner.query(`DROP INDEX \`IDX_337b9a908fb717d627d257c5a2\` ON \`Sales_Price\``);
        await queryRunner.query(`DROP TABLE \`Sales_Price\``);
        await queryRunner.query(`DROP TABLE \`Inventory\``);
        await queryRunner.query(`DROP INDEX \`IDX_5250b830fdc3d284bddc03bbe4\` ON \`Product_Color\``);
        await queryRunner.query(`DROP TABLE \`Product_Color\``);
        await queryRunner.query(`DROP INDEX \`REL_a225ab2c5f2f55d3ef516c8b79\` ON \`Shops\``);
        await queryRunner.query(`DROP INDEX \`IDX_03262247e2d1c7da92ed00a456\` ON \`Shops\``);
        await queryRunner.query(`DROP TABLE \`Shops\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d5ee169e3180495b27cecc483\` ON \`Address\``);
        await queryRunner.query(`DROP TABLE \`Address\``);
        await queryRunner.query(`DROP INDEX \`IDX_090de8cc080a13b95e31a0a520\` ON \`City\``);
        await queryRunner.query(`DROP TABLE \`City\``);
        await queryRunner.query(`DROP INDEX \`IDX_08bdc6dc787ba82ce7e59c4cc8\` ON \`District\``);
        await queryRunner.query(`DROP TABLE \`District\``);
        await queryRunner.query(`DROP INDEX \`IDX_4be134f151488ae31a8263306b\` ON \`Ward\``);
        await queryRunner.query(`DROP TABLE \`Ward\``);
    }

}
