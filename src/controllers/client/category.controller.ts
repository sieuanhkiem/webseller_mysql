import { Request, Response } from 'express';
import { logging } from '../../config/logging';
import { Common } from '../../common/common_extendsion';

export default class CategoryController {
    public static async index(req: Request, res: Response) {
        console.log(req.params);
        const data: object[] = [
            {
                image: 'Vòng Tay Trầm Hương 108 Hạt Sánh Chìm Mix Hoa Sen Trầm Cao Cấp Trầm Hương Đủ Kích Thước Nam Nữ.jpeg',
                title: 'Vòng Tay Trầm Hương 108 Hạt Sánh Chìm Mix Hoa Sen Trầm Cao Cấp Trầm Hương Đủ Kích Thước Nam Nữ',
                price: 790.000
            },

            {
                image: 'Vòng Tay Trầm Hương 108 Hạt Trầm Hương Tự Nhiên.jpeg',
                title: 'Vòng Tay Trầm Hương 108 Hạt Sánh Chìm Mix Hoa Sen Trầm Cao Cấp Trầm Hương Đủ Kích Thước Nam Nữ',
                price: 790.000
            },

            {
                image: 'Vòng tay trầm hương 108 hạt.jpeg',
                title: 'Vòng Tay Trầm Hương 108 Hạt Sánh Chìm Mix Hoa Sen Trầm Cao Cấp Trầm Hương Đủ Kích Thước Nam Nữ',
                price: 790.000
            },
            {
                image: 'Vòng tay trầm hương 108 hạtj Mix Cỏ 4 lá theo mệnh.jpeg',
                title: 'Vòng Tay Trầm Hương 108 Hạt Sánh Chìm Mix Hoa Sen Trầm Cao Cấp Trầm Hương Đủ Kích Thước Nam Nữ',
                price: 790.000
            },

            {
                image: 'Vòng tay Trầm hương đơn mix charm.jpeg',
                title: 'Vòng Tay Trầm Hương 108 Hạt Sánh Chìm Mix Hoa Sen Trầm Cao Cấp Trầm Hương Đủ Kích Thước Nam Nữ',
                price: 790.000
            },
            {
                image: 'mô tả trầm hương 1.jpg',
                title: 'Vòng Tay Trầm Hương 108 Hạt Sánh Chìm Mix Hoa Sen Trầm Cao Cấp Trầm Hương Đủ Kích Thước Nam Nữ',
                price: 790.000
            },

            {
                image: 'mô tả trầm hương 3.jpg',
                title: 'Vòng Tay Trầm Hương 108 Hạt Sánh Chìm Mix Hoa Sen Trầm Cao Cấp Trầm Hương Đủ Kích Thước Nam Nữ',
                price: 800.000
            }
        ]

        return res.render('./client/category.ejs', { data });
    }
}