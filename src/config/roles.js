export const roles = ['user', 'admin']

const rights = new Map()
rights.set(roles[0], [])
rights.set(roles[1], [])

export const roleRights = rights

export default {
  roles,
  roleRights,
}
