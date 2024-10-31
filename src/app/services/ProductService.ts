import { BaseService } from "./BaseService";

interface GetProducts {
  params: Record<string, string>;
}

export class ProductService extends BaseService {
  async getProducts({ params }: GetProducts) {
    const headers = {
      "content-type": "application/json",
    };

    return await this.get({ headers, params });
  }
}
