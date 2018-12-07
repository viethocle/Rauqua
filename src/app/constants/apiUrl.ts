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
    shop: "products?shop_id="
  },
  order: {
    all: "orders",
    delete: "orders/"
  },
  promotion: {
    all: "promotions",
    delete: "promotions/"
  },
  coupon: {
    all: "coupons",
    delete: "coupons/"
  },
  shop: {
    all: "shops",
    create: "shops",
    delete: "shops/",
    edit: "shops/"
  }
}
