export const serverURL = "https://greengrocer.herokuapp.com/api/admin/"
export const baseURL = "https://greengrocer.herokuapp.com/api/"
export const apiURL = {
  auth: {
    login: "login"
  },
  categoty: {
    all: "categories",
    edit: "categories/",
    detail: "categories/",
    create: "categories",
    delete: "categories/",
  },
  user: {
    all: "users",
    provider: "users",
    delete: "users/"
  },
  resources: {
    all: "resources"
  },
  manager: {
    all: "managers",
    create: "managers",
    update: "managers/",
    provider: "managers?role=provider"
  },
  product: {
    all: "products",
    post: "products",
    delete: "products/",
    detail: "products/",
    edit: "products/",
    shop: "products?shop_id="
  },
  order: {
    all: "orders",
    delete: "orders/",
    detail: "orders/",
    update: "orders/"
  },
  promotion: {
    all: "promotions",
    create: "promotions",
    delete: "promotions/",
    edit: "promotions/"
  },
  coupon: {
    all: "coupons",
    edit: "coupons/",
    create: "coupons",
    delete: "coupons/"
  },
  shop: {
    all: "shops",
    create: "shops",
    delete: "shops/",
    edit: "shops/"
  },
  customer: {
    all: "users",
    update: "users/",
    delete: "users/"
  }
}
