export const roles = ['super admin', 'admin', 'user']

const rights = new Map()

const adminpermissions = ['manage user']

rights.set(roles[0], ['manage role', ...adminpermissions])
rights.set(roles[1], adminpermissions)
rights.set(roles[2], [])

export const roleRights = rights

export default {
  roles,
  roleRights,
}
