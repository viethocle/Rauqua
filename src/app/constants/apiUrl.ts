export const serverURL = "https://greengrocer.herokuapp.com/api/admin/"
export const baseURL = "https://greengrocer.herokuapp.com/api/"
export const apiURL = {
  auth: {
    login: "login"
  },
  categoty: {
    all: "categories",
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
    update: "managers/"
  },
  product: {
    all: "products",
    post: "products",
    delete: "products/"
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
  }
}
