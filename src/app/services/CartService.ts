import { BaseService } from "./BaseService";

interface GetProducts {
  params?: Record<string, string>;
  body?: Record<string, string>;
}

export class CartService extends BaseService {
  async createCart({ params, body }: GetProducts) {
    const headers = {
      "content-type": "application/json",
    };

    return await this.post({ headers, params, body });
  }

  async getCart({ params }: GetProducts) {
    const headers = {
      "content-type": "application/json",
    };

    return await this.get({ headers, params });
  }

  async updateCart({ params, body }: GetProducts) {
    const headers = {
      "content-type": "application/json",
    };

    return await this.post({ headers, params, body });
  }
}
