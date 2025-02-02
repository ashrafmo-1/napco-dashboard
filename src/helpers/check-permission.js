export const checkPermission = (permissionName) => {
  const permissions = JSON.parse(localStorage.getItem("napco-permissions"));
  const permissionAccess = permissions.find(
    (p) => p.permissionName === permissionName
  );

  return permissionAccess && permissionAccess.access === true;
};