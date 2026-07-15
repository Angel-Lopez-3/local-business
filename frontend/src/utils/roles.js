export const ROLES = {
  ADMIN: "admin",
  BUSINESS: "business",
  USER: "user",
};

export const roleLabel = (roleName) => {
  switch (roleName) {
    case ROLES.ADMIN:
      return "Administrador";
    case ROLES.BUSINESS:
      return "Negocio";
    case ROLES.USER:
      return "Usuario";
    default:
      return roleName || "-";
  }
};
