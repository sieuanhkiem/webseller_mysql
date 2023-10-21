import { Image } from "../../entity/image";

export class ImageModel extends Image {
    public constructor(image: Image) {
        super();
        this.id = image.id;
        this.image_code = image.image_code;
        this.image_default = image.image_default;
        this.image_name = image.image_name;
        this.image_type = image.image_type
    }
    image_base64?: string
}