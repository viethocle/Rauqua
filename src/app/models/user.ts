export interface User {
  id: number
  username: string
  email: String
  name: String
  active: number
  userInfor: UserInfor
  userRole: UserRole
}

class UserInfor {
  fullname: string
  birthday: string
  avatar: string
  address: string
  phone: string
} 

class UserRole {
  id: number
  name: string
}