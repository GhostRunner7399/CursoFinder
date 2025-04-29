import React, { useEffect, useState } from "react";
import "./AdminCoursesTabGestionarU.css";
import { FaChevronDown } from "react-icons/fa";
import Modal from "../../../components/Modal/Modal.jsx";

function AdminCoursesTabGestionarU({ users }) {
  // Estados para usuarios
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("activos"); // "activos" o "inactivos"
  const [sortOrder, setSortOrder] = useState(""); // "asc" o "desc"
  const [roleFilter, setRoleFilter] = useState("Mostrar todos"); // "Mostrar todos", "Administradores", "Docentes"
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "crearUsuario", "editarUsuario", "eliminarUsuario"
  const [nuevoUsuario, setNuevoUsuario] = useState({
    primernombre: "",
    segundonombre: "",
    primerapellido: "",
    segundoapellido: "",
    cif: "",
    contraseña: "",
    email: "",
    telefono: "",
    idRol: "", // 1 = Administrador, 2 = Docente
    activo: true,
  });
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filtrado y ordenamiento de usuarios
  useEffect(() => {
    if (!Array.isArray(users)) {
      setFilteredUsers([]);
      return;
    }
  
    // Adaptamos los datos que vienen del backend (nombreCompleto → separado)
    const adaptedUsers = users.map((user) => {
      const [primernombre = "", segundonombre = "", primerapellido = "", segundoapellido = ""] = (user.nombreCompleto || "").split(" ");
      return {
        ...user,
        primernombre,
        segundonombre,
        primerapellido,
        segundoapellido,
        activo: true // como no viene, asumimos que están activos
      };
    });
  
    let filtered = [...adaptedUsers];
  
    // Luego tus filtros normales:
    if (activeStatus === "activos") {
      filtered = filtered.filter((user) => user.activo === true);
    } else if (activeStatus === "inactivos") {
      filtered = filtered.filter((user) => user.activo === false);
    }
  
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((user) =>
        (user.primernombre && user.primernombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.primerapellido && user.primerapellido.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  
    if (roleFilter !== "Mostrar todos") {
      if (roleFilter === "Administradores") {
        filtered = filtered.filter((user) => user.idRol === 1);
      } else if (roleFilter === "Docentes") {
        filtered = filtered.filter((user) => user.idRol === 2);
      }
    }
  
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.primernombre.localeCompare(b.primernombre));
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.primernombre.localeCompare(a.primernombre));
    }
  
    setFilteredUsers(filtered);
  }, [users, activeStatus, sortOrder, searchTerm, roleFilter]);
  

  // Función para seleccionar/desseleccionar usuarios
  const toggleUserSelection = (cif) => {
    if (!cif) return;
    setSelectedUserIds(prevSelected =>
      prevSelected.includes(cif)
        ? prevSelected.filter(id => id !== cif)
        : [...prevSelected, cif]
    );
  };

  // Funciones para el dropdown de rol
  const handleRoleSelect = (rol) => {
    setRoleFilter(rol);
    setShowRoleDropdown(false);
  };

  // Apertura de modales
  const openCreateModal = () => {
    setModalType("crearUsuario");
    setNuevoUsuario({
      primernombre: "",
      segundonombre: "",
      primerapellido: "",
      segundoapellido: "",
      cif: "",
      contraseña: "",
      email: "",
      telefono: "",
      idRol: "",
      activo: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = async () => {
    if (selectedUserIds.length === 0) {
      alert("Selecciona un usuario para editar.");
      return;
    }
  
    if (selectedUserIds.length > 1) {
      alert("Solo puedes editar un usuario a la vez. Por favor selecciona solo uno.");
      return;
    }
  
    const userSelected = filteredUsers.find(user => selectedUserIds.includes(user.cif));
    if (!userSelected) {
      alert("Usuario no encontrado.");
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:8080/api/users/info/${userSelected.cif}`);
      if (res.ok) {
        const data = await res.json();
        setNuevoUsuario({
          primernombre: userSelected.primernombre,
          segundonombre: userSelected.segundonombre,
          primerapellido: userSelected.primerapellido,
          segundoapellido: userSelected.segundoapellido,
          email: data.email,
          telefono: data.telefono || "",
          cif: data.cif,
          idRol: data.idRol,
          activo: true,
          contraseña: ""
        });
        setModalType("editarUsuario");
        setIsModalOpen(true);
      } else {
        alert("Error al obtener información del usuario.");
      }
    } catch (error) {
      console.error("Error al buscar usuario:", error);
    }
  };
  
  

  const openDeleteModal = () => {
    if (selectedUserIds.length === 0) {
      alert("Selecciona al menos un usuario para eliminar.");
      return;
    }
    setModalType("eliminarUsuario");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para crear usuario (POST)
  const handleSubmitCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/users/action/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      if (res.ok) {
        alert("Usuario creado exitosamente");
        closeModal();
        // Actualizar lista localmente SIN recargar:
        const data = await res.json();
        setFilteredUsers(prev => [...prev, data]);
      } else {
        const error = await res.text();
        alert("Error al crear usuario: " + error);
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };  

  const handleSubmitEditUser = async (e) => {
    e.preventDefault();
    try {
      const { contraseña, ...usuarioActualizado } = nuevoUsuario; 
      const res = await fetch(`http://localhost:8080/api/users/${nuevoUsuario.cif}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado),
      });
      if (res.ok) {
        alert("Usuario actualizado exitosamente");
        closeModal();
      } else {
        const error = await res.text();
        alert("Error al actualizar usuario: " + error);
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };  

  // Función para eliminar usuario(s) (DELETE)
  const handleConfirmDeleteUser = async () => {
    try {
      setIsDeleting(true);
      for (const cif of selectedUserIds) {
        await fetch(`http://localhost:8080/api/users/delete/${cif}`, {
          method: "DELETE",
        });
      }
      alert("Usuario(s) eliminado(s) exitosamente.");
      closeModal();
      // Actualizar usuarios localmente SIN recargar:
      setFilteredUsers(prev => prev.filter(user => !selectedUserIds.includes(user.cif)));
      setSelectedUserIds([]);
    } catch (error) {
      console.error("Error eliminando usuario(s):", error);
      alert("Hubo un error eliminando los usuarios.");
    } finally {
      setIsDeleting(false);
    }
  };  

  // Retorno del componente y renderizado del listado y modales
  return (
    <div className="gestionar-usuarios-tab">
      <div className="gestionar-usuarios-sidebar">
        <div className="estado-filtros">
          <p className={`estado-item ${activeStatus === "activos" ? "active" : ""}`} onClick={() => setActiveStatus("activos")}>Activos</p>
          <p className={`estado-item ${activeStatus === "inactivos" ? "active" : ""}`} onClick={() => setActiveStatus("inactivos")}>Inactivos</p>
          
          {/* Dropdown de ordenamiento */}
          <div className="sort-container">
            <button className="sort-button" onClick={() => setSortOrder("asc")}>Ordenar A-Z</button>
            <button className="sort-button" onClick={() => setSortOrder("desc")}>Ordenar Z-A</button>
          </div>
          
          {/* Dropdown para filtro por rol */}
          <div className="role-filter-container">
            <button className="role-dropdown" onClick={() => setShowRoleDropdown(!showRoleDropdown)}>
                {roleFilter || "Filtrar Rol"} <FaChevronDown />
            </button>
            {showRoleDropdown && (
                <div className="role-options">
                {["Administradores", "Docentes"].map((rolOption) => (
                    <p key={rolOption} onClick={() => handleRoleSelect(rolOption)}>
                    {rolOption}
                    </p>
                ))}
                <p className="reset-role" onClick={() => handleRoleSelect("Mostrar todos")}>Mostrar todos</p>
                </div>
            )}
            </div>
        </div>
        <div className="botones-acciones">
          <button className="btn-editar" onClick={openEditModal}>Editar Usuario</button>
          <button className="btn-eliminar" onClick={openDeleteModal}>Eliminar Usuario</button>
          <button className="btn-crear" onClick={openCreateModal}>Crear Usuario</button>
        </div>
      </div>

      <div className="gestionar-usuarios-main">
        <div className="header-gestionar">
          <h2>Usuarios</h2>
          <input
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="usuarios-listado">
          {filteredUsers.length === 0 ? (
            <p className="no-usuarios-message">No hay usuarios encontrados</p>
          ) : (
            filteredUsers.map((user) => {
              // Construir el nombre completo
              const nombreCompleto = `${user.primernombre || ""} ${user.segundonombre || ""} ${user.primerapellido || ""} ${user.segundoapellido || ""}`.trim();
              const rolLabel = user.idRol === 1 ? "Administrador" : user.idRol === 2 ? "Docente" : "Sin rol";
              return (
                <div key={user.cif} className="usuario-item">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.cif)}
                    onChange={() => toggleUserSelection(user.cif)}
                  />
                  <div className="usuario-info">
                    <p><strong>Nombre:</strong> {nombreCompleto}</p>
                    <p><strong>CIF:</strong> {user.cif}</p>
                    <p><strong>Rol:</strong> {rolLabel}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Modal key={modalType} isOpen={isModalOpen} onClose={closeModal}>
        {modalType === "crearUsuario" && (
          <div className="formulario-usuario">
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmitCreateUser} className="form-grid">
              <div className="form-group">
                <label>Primer Nombre</label>
                <input
                  type="text"
                  value={nuevoUsuario.primernombre}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, primernombre: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Segundo Nombre</label>
                <input
                  type="text"
                  value={nuevoUsuario.segundonombre}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, segundonombre: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Primer Apellido</label>
                <input
                  type="text"
                  value={nuevoUsuario.primerapellido}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, primerapellido: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Segundo Apellido</label>
                <input
                  type="text"
                  value={nuevoUsuario.segundoapellido}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, segundoapellido: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={nuevoUsuario.contraseña}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>CIF</label>
                <input
                  type="number"
                  value={nuevoUsuario.cif}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, cif: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  value={nuevoUsuario.telefono}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select
                  value={nuevoUsuario.idRol}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, idRol: Number(e.target.value) })}
                  required
                >
                  <option value="">Seleccione un Rol</option>
                  <option value={1}>Administrador</option>
                  <option value={2}>Docente</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar Usuario</button>
              </div>
            </form>
          </div>
        )}
        {modalType === "editarUsuario" && (
          <div className="formulario-usuario">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmitEditUser} className="form-grid">
              <div className="form-group">
                <label>Primer Nombre</label>
                <input
                  type="text"
                  value={nuevoUsuario.primernombre}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, primernombre: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Segundo Nombre</label>
                <input
                  type="text"
                  value={nuevoUsuario.segundonombre}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, segundonombre: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Primer Apellido</label>
                <input
                  type="text"
                  value={nuevoUsuario.primerapellido}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, primerapellido: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Segundo Apellido</label>
                <input
                  type="text"
                  value={nuevoUsuario.segundoapellido}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, segundoapellido: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>CIF</label>
                <input
                  type="number"
                  value={nuevoUsuario.cif}
                  readOnly
                  disabled
                  style={{ backgroundColor: "#e0e0e0" }}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  value={nuevoUsuario.telefono}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, telefono: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select
                  value={nuevoUsuario.idRol}
                  onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, idRol: Number(e.target.value) })}
                  required
                >
                  <option value="">Seleccione un Rol</option>
                  <option value={1}>Administrador</option>
                  <option value={2}>Docente</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Actualizar Usuario</button>
              </div>
            </form>
          </div>
        )}

        {modalType === "eliminarUsuario" && (
        <div className="formulario-usuario">
            {isDeleting ? (
            <p>Eliminando usuario(s)...</p>
            ) : (
            <>
                <h2>Confirmar Eliminación</h2>
                <p>¿Seguro que quieres eliminar {selectedUserIds.length} usuario(s)?</p>
                <ul style={{ marginTop: '10px', marginBottom: '20px', listStyleType: 'disc', paddingLeft: '20px' }}>
                {filteredUsers
                    .filter(user => selectedUserIds.includes(user.cif))
                    .map(user => {
                    const nombreCompleto = `${user.primernombre || ""} ${user.segundonombre || ""} ${user.primerapellido || ""} ${user.segundoapellido || ""}`.replace(/\s+/g, ' ').trim();
                    return (
                        <li key={user.cif}>{nombreCompleto}</li>
                    );
                    })}
                </ul>
                <div className="form-buttons">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="button" className="btn-danger" onClick={handleConfirmDeleteUser}>Eliminar</button>
                </div>
            </>
            )}
        </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminCoursesTabGestionarU;
