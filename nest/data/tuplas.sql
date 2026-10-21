-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.11.14-MariaDB-0ubuntu0.24.04.1 - Ubuntu 24.04
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table coreman.mod_permisos_modulo: ~36 rows (approximately)
INSERT INTO `mod_permisos_modulo` (`id`, `nombre`, `permiso`, `tiene_submodulos`, `tiene_permisos`, `descripcion`, `modulo_padre_id`) VALUES
	(1, 'Usuarios', 'usuarios', 1, 0, 'Modulo usuarios', NULL),
	(2, 'Administradores', 'administradores', 0, 1, 'Permiso administradores, modulo usuarios', 1),
	(3, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo administradores, modulo usuarios', 2),
	(4, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo administradores, modulo usuarios', 2),
	(5, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo administradores, modulo usuarios', 2),
	(6, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 2),
	(7, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar multiple, submodulo administradores, modulo usuarios', 2),
	(8, 'Estado (usuario)', 'estado_usuario', 0, 0, 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2),
	(9, 'Permisos (asignar)', 'asignar_permisos', 0, 0, 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2),
	(10, 'Descargar (Reporte permisos)', 'descarga_reporte_permisos', 0, 0, 'Permiso descarga_reporte_permisos usuario, submodulo administradores, modulo usuarios', 2),
	(11, 'Finales', 'finales', 0, 1, 'Permiso finales, modulo usuarios', 1),
	(12, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo finales, modulo usuarios', 11),
	(13, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo finales, modulo usuarios', 11),
	(14, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo finales, modulo usuarios', 11),
	(15, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar individual, submodulo finales, modulo usuarios', 11),
	(16, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar multiple, submodulo finales, modulo usuarios', 11),
	(17, 'Estado (usuario)', 'estado_usuario', 0, 0, 'Permiso estado usuario, submodulo finales, modulo usuarios', 11),
	(18, 'Modulos', 'modulos', 0, 1, 'Modulo modulos', NULL),
	(19, 'Ver', 'ver', 0, 0, 'Permiso ver, modulo modulos', 18),
	(20, 'Crear', 'crear', 0, 0, 'Permiso crear, modulo modulos', 18),
	(21, 'Editar', 'editar', 0, 0, 'Permiso editar, modulo modulos', 18),
	(22, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, modulo modulos', 18),
	(23, 'Personalizacion', 'estilos_sistema', 0, 0, 'Modulo general para el estilos del sistema', NULL),
	(24, 'Variables del sistema', 'variables_sistema', 1, 0, 'Modulo configurables', NULL),
	(25, 'VAR', 'system_var', 0, 1, 'Permiso var, modulo configurable', 24),
	(26, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo var, modulo variables del sistema', 25),
	(27, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo var, modulo variables del sistema', 25),
	(28, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo var, modulo variables del sistema', 25),
	(29, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, submodulo var, modulo variables del sistema', 25),
	(30, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar_multiple, submodulo var, modulo variables del sistema', 25),
	(31, 'JSON', 'system_json', 0, 1, 'Permiso json, modulo configurable', 24),
	(32, 'Ver', 'ver', 0, 0, 'Permiso ver, submodulo json, modulo variables del sistema', 31),
	(33, 'Crear', 'crear', 0, 0, 'Permiso crear, submodulo json, modulo variables del sistema', 31),
	(34, 'Editar', 'editar', 0, 0, 'Permiso editar, submodulo json, modulo variables del sistema', 31),
	(35, 'Eliminar (individual)', 'eliminar_individual', 0, 0, 'Permiso eliminar_individual, submodulo json, modulo variables del sistema', 31),
	(36, 'Eliminar (multiple)', 'eliminar_multiple', 0, 0, 'Permiso eliminar_multiple, submodulo json, modulo variables del sistema', 31);

-- Dumping data for table coreman.mod_permisos_modulo_asignacion: ~32 rows (approximately)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `id_modulo`, `modulo_padre_id`, `user_id`) VALUES
	(1, 'Usuarios', 'usuarios', 'Modulo usuarios', 1, NULL, 1),
	(2, 'Administradores', 'administradores', 'Permiso administradores, modulo usuarios', 2, 1, 1),
	(3, 'Permisos (asignar)', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 9, 2, 1),
	(4, 'Ver', 'ver', 'Permiso ver, submodulo administradores, modulo usuarios', 3, 2, 1),
	(5, 'Crear', 'crear', 'Permiso crear, submodulo administradores, modulo usuarios', 4, 2, 1),
	(6, 'Editar', 'editar', 'Permiso editar, submodulo administradores, modulo usuarios', 5, 2, 1),
	(7, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 6, 2, 1),
	(8, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo administradores, modulo usuarios', 8, 2, 1),
	(9, 'Descargar (Reporte permisos)', 'descarga_reporte_permisos', 'Permiso descarga_reporte_permisos usuario, submodulo administradores, modulo usuarios', 10, 2, 1),
	(10, 'Finales', 'finales', 'Permiso finales, modulo usuarios', 11, 1, 1),
	(11, 'Ver', 'ver', 'Permiso ver, submodulo finales, modulo usuarios', 12, 11, 1),
	(12, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 13, 11, 1),
	(13, 'Editar', 'editar', 'Permiso editar, submodulo finales, modulo usuarios', 14, 11, 1),
	(14, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo finales, modulo usuarios', 15, 11, 1),
	(15, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo finales, modulo usuarios', 17, 11, 1),
	(16, 'Modulos', 'modulos', 'Modulo modulos', 18, NULL, 1),
	(17, 'Ver', 'ver', 'Permiso ver, modulo modulos', 19, 18, 1),
	(18, 'Crear', 'crear', 'Permiso crear, modulo modulos', 20, 18, 1),
	(19, 'Editar', 'editar', 'Permiso editar, modulo modulos', 21, 18, 1),
	(20, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, modulo modulos', 22, 18, 1),
	(21, 'Variables del sistema', 'variables_sistema', 'Modulo configurables', 24, NULL, 1),
	(22, 'VAR', 'system_var', 'Permiso var, modulo configurable', 25, 24, 1),
	(37, 'Personalizacion', 'estilos_sistema', 'Modulo general para el estilos del sistema', 31, NULL, 1),
	(38, 'JSON', 'system_json', 'Permiso json, modulo configurable', 31, 24, 1),
	(39, 'Ver', 'ver', 'Permiso ver, submodulo var, modulo variables del sistema', 26, 25, 1),
	(40, 'Crear', 'crear', 'Permiso crear, submodulo var, modulo variables del sistema', 27, 25, 1),
	(41, 'Editar', 'editar', 'Permiso editar, submodulo var, modulo variables del sistema', 28, 25, 1),
	(42, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo var, modulo variables del sistema', 29, 25, 1),
	(43, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, submodulo json, modulo variables del sistema', 35, 31, 1),
	(44, 'Editar', 'editar', 'Permiso editar, submodulo json, modulo variables del sistema', 34, 31, 1),
	(45, 'Crear', 'crear', 'Permiso crear, submodulo json, modulo variables del sistema', 33, 31, 1),
	(46, 'Ver', 'ver', 'Permiso ver, submodulo json, modulo variables del sistema', 32, 31, 1);

-- Dumping data for table coreman.mod_usuarios_admin: ~0 rows (approximately)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Javier Ricardo', 'Baron Fuentes', 'jrbaron@uts.edu.co', 'Qwerty9601.', 1);

-- Dumping data for table coreman.mod_usuarios_user: ~0 rows (approximately)

-- Dumping data for table coreman.mod_vars_json: ~1 rows (approximately)
INSERT INTO `mod_vars_json` (`id`, `nombre`, `valor`) VALUES
	(1, 'custom_system', '"{\\n  \\"light\\": {\\n    \\"layout\\": {\\n      \\"scroll\\": {\\n        \\"color\\": \\"#A19C9D\\",\\n        \\"background_color\\": \\"transparent\\"\\n      },\\n      \\"breadcrumbs\\": {\\n        \\"link-disabled\\": \\"#D5E7F2\\",\\n        \\"link-active\\": \\"#FFFFFF\\",\\n        \\"link-hover\\": \\"#FFFFFF\\",\\n        \\"separator\\": \\"#D5E7F2\\",\\n        \\"bg_color_breadcrumb\\": \\"#000000\\"\\n      },\\n      \\"index\\": {\\n        \\"header_color_background\\": \\"#0b4a75\\",\\n        \\"back_color_background\\": \\"#EDEDED\\",\\n        \\"back_color_title\\": \\"#000000\\",\\n        \\"back_color_p\\": \\"#878382\\",\\n        \\"background_color_card_menu\\": \\"#FAF5F5\\",\\n        \\"backg_color_textcard\\": \\"#000000\\",\\n        \\"logo_color_icon_text\\": \\"#000000\\",\\n        \\"logo_color_hover_icon_text\\": \\"#0b4a75\\",\\n        \\"logo_color_hover_amount\\": 20,\\n        \\"footer_text_background\\": \\"#FFFFFF\\",\\n        \\"footer_color_background\\": \\"#0b0f17\\"\\n      },\\n      \\"admin\\": {\\n        \\"header_color_background\\": \\"#0b4a75\\",\\n        \\"header_color_line\\": \\"#E06767\\",\\n        \\"main_background_color\\": \\"#EDEDED\\",\\n        \\"heder_color_icons\\": \\"#C8CCCF\\",\\n        \\"dropdawn_text_color\\": \\"#4F4D4D\\",\\n        \\"dropdawn_background\\": \\"#FFFFFF\\",\\n        \\"dropdown_hover_background\\": \\"#E8E3E3\\",\\n        \\"side_color_background\\": \\"#000000\\",\\n        \\"side_color_icon_text\\": \\"rgba(255, 255, 255, 0.4)\\",\\n        \\"side_color_hover_icon_text\\": \\"#0b4a75\\",\\n        \\"side_color_hover_amount\\": 20,\\n        \\"side_line_color_separator\\": \\"#FFFFFF\\",\\n        \\"side_dropdawn_text_color\\": \\"#4F4D4D\\",\\n        \\"side_dropdawn_background\\": \\"#FFFFFF\\",\\n        \\"side_dropdown_hover_background\\": \\"#E8E3E3\\",\\n        \\"page_color_title\\": \\"#000000\\",\\n        \\"footer_color_background\\": \\"#0b0f17\\",\\n        \\"footer_color_text\\": \\"#FFFFFF\\"\\n      }\\n    },\\n    \\"kpicard\\": {\\n      \\"icon_color\\": \\"#000000\\",\\n      \\"border_line_color\\": \\"#0a18f5\\",\\n      \\"background_color\\": \\"#FFFFFF\\",\\n      \\"text_color\\": \\"#948F8F\\",\\n      \\"text_number_color\\": \\"#000000\\"\\n    },\\n    \\"title_page\\": {\\n      \\"background_card_color\\": \\"#FFFFFF\\",\\n      \\"icon_color\\": \\"#000000\\",\\n      \\"text_color\\": \\"#000000\\",\\n      \\"line_color\\": \\"#000000\\"\\n    },\\n    \\"card_menu\\": {\\n      \\"text_color\\": \\"#000000\\",\\n      \\"icon_color\\": \\"#000000\\",\\n      \\"hover_card_color\\": \\"#CFCACA\\",\\n      \\"background_card_color\\": \\"#FFFFFF\\"\\n    },\\n    \\"grid_table_crud\\": {\\n      \\"title_color\\": \\"#3B3939\\",\\n      \\"text_color\\": \\"#948F8F\\",\\n      \\"background_color\\": \\"#FFFFFF\\",\\n      \\"head_background\\": \\"#0a18f5\\",\\n      \\"head_text_color\\": \\"#FFFFFF\\",\\n      \\"row_text_color\\": \\"#000000\\",\\n      \\"row_text_select\\": \\"#FFFFFF\\",\\n      \\"row_select\\": \\"#B9BDAE\\",\\n      \\"button_group_disabled\\": \\"#BEBFC2\\",\\n      \\"button_cargar_excel\\": \\"#10B981\\",\\n      \\"button_crear\\": \\"#059669\\",\\n      \\"button_ver\\": \\"#0A18F5\\",\\n      \\"button_editar\\": \\"#3B82F6\\",\\n      \\"button_estado_usuario\\": \\"#F59E0B\\",\\n      \\"button_eliminar_individual\\": \\"#EF4444\\",\\n      \\"button_eliminar_multiple\\": \\"#B91C1C\\",\\n      \\"button_asignar_permisos\\": \\"#E8E417\\",\\n      \\"button_asignar_productos\\": \\"#6D28D9\\",\\n      \\"button_limpiar\\": \\"#6B7280\\"\\n    },\\n    \\"input\\": {\\n      \\"label_color\\": \\"#000000\\",\\n      \\"text_color_placeholder\\": \\"#B6C2B4\\",\\n      \\"background_color\\": \\"#FFFFFF\\",\\n      \\"text_color\\": \\"#000000\\",\\n      \\"border_color\\": \\"#0a18f5\\"\\n    },\\n    \\"modal\\": {\\n      \\"fieldset_line_color\\": \\"#8998A3\\",\\n      \\"legend_text_color\\": \\"#0b4a75\\",\\n      \\"label_text_color\\": \\"#000000\\",\\n      \\"head_text_color\\": \\"#FFFFFF\\",\\n      \\"head_background_color\\": \\"#0b4a75\\",\\n      \\"back_color_background\\": \\"#FFFFFF\\",\\n      \\"body_text_color\\": \\"#948F8F\\",\\n      \\"body_background_color\\": \\"#FFFFFF\\",\\n      \\"button_cancel_background_color\\": \\"#8A8484\\",\\n      \\"button_cancel_text_color\\": \\"#FFFFFF\\",\\n      \\"button_save_background_color\\": \\"#059669\\",\\n      \\"button_save_text_color\\": \\"#FFFFFF\\",\\n      \\"button_update_background_color\\": \\"#3B82F6\\",\\n      \\"button_update_text_color\\": \\"#FFFFFF\\",\\n      \\"footer_text_color\\": \\"#948F8F\\",\\n      \\"footer_background_color\\": \\"#EDEDED\\"\\n    },\\n    \\"search\\": {\\n      \\"button_background_color\\": \\"#0A18F5\\",\\n      \\"body_color_text\\": \\"#000000\\",\\n      \\"back_color_background\\": \\"#EDEDED\\",\\n      \\"icon_background_color\\": \\"#FFFFFF\\",\\n      \\"head_text_color\\": \\"#FFFFFF\\",\\n      \\"head_background_color\\": \\"#0A18F5\\"\\n    },\\n    \\"report\\": {\\n      \\"button_background_color\\": \\"#469443\\",\\n      \\"back_color_background\\": \\"#EDEDED\\",\\n      \\"icon_background_color\\": \\"#FFFFFF\\",\\n      \\"head_text_color\\": \\"#FFFFFF\\",\\n      \\"head_background_color\\": \\"#0A18F5\\"\\n    }\\n  },\\n  \\"dark\\": {\\n    \\"layout\\": {\\n      \\"scroll\\": {\\n        \\"color\\": \\"#D4CFD0\\",\\n        \\"background_color\\": \\"transparent\\"\\n      },\\n      \\"breadcrumbs\\": {\\n        \\"link-disabled\\": \\"#B6F2C0\\",\\n        \\"link-active\\": \\"#FFFFFF\\",\\n        \\"link-hover\\": \\"#EDE4E4\\",\\n        \\"separator\\": \\"#B6F2C0\\",\\n        \\"bg_color_breadcrumb\\": \\"#000000\\"\\n      },\\n      \\"index\\": {\\n        \\"header_color_background\\": \\"#000000\\",\\n        \\"back_color_background\\": \\"#0A0A0A\\",\\n        \\"backg_color_textcard\\": \\"#000000\\",\\n        \\"back_color_title\\": \\"#FFFFFF\\",\\n        \\"back_color_p\\": \\"#FFFFFF\\",\\n        \\"logo_color_icon_text\\": \\"#000000\\",\\n        \\"logo_color_hover_icon_text\\": \\"#0b4a75\\",\\n        \\"logo_color_hover_amount\\": 20,\\n        \\"background_color_card_menu\\": \\"#EDEDED\\",\\n        \\"footer_text_background\\": \\"#FFFFFF\\",\\n        \\"footer_color_background\\": \\"#0F0F0F\\"\\n      },\\n      \\"admin\\": {\\n        \\"header_color_background\\": \\"#069E21\\",\\n        \\"header_color_line\\": \\"#FFFFFF\\",\\n        \\"main_background_color\\": \\"#0A0A0A\\",\\n        \\"heder_color_icons\\": \\"#DEDEDE\\",\\n        \\"dropdawn_text_color\\": \\"#FFFFFF\\",\\n        \\"dropdawn_background\\": \\"#000000\\",\\n        \\"dropdown_hover_background\\": \\"#8A8686\\",\\n        \\"side_color_background\\": \\"#000000\\",\\n        \\"side_color_icon_text\\": \\"rgba(255, 255, 255, 0.4)\\",\\n        \\"side_color_hover_icon_text\\": \\"#0b4a75\\",\\n        \\"side_color_hover_amount\\": 20,\\n        \\"side_line_color_separator\\": \\"#FFFFFF\\",\\n        \\"side_dropdawn_text_color\\": \\"#FFFFFF\\",\\n        \\"side_dropdawn_background\\": \\"#302F2F\\",\\n        \\"side_dropdown_hover_background\\": \\"#8A8686\\",\\n        \\"page_color_title\\": \\"#FFFFFF\\",\\n        \\"footer_color_background\\": \\"#0F0F0F\\",\\n        \\"footer_color_text\\": \\"#FFFFFF\\"\\n      }\\n    },\\n    \\"kpicard\\": {\\n      \\"icon_color\\": \\"#FFFFFF\\",\\n      \\"border_line_color\\": \\"#157D00\\",\\n      \\"background_color\\": \\"#2B2A2A\\",\\n      \\"text_color\\": \\"#FFFFFF\\",\\n      \\"text_number_color\\": \\"#FFFFFF\\"\\n    },\\n    \\"title_page\\": {\\n      \\"background_card_color\\": \\"#2b2a2a\\",\\n      \\"icon_color\\": \\"#FFFFFF\\",\\n      \\"text_color\\": \\"#FFFFFF\\",\\n      \\"line_color\\": \\"#FFFFFF\\"\\n    },\\n    \\"card_menu\\": {\\n      \\"text_color\\": \\"#FFFFFF\\",\\n      \\"icon_color\\": \\"#FFFFFF\\",\\n      \\"hover_card_color\\": \\"#716f6f\\",\\n      \\"background_card_color\\": \\"#474747\\"\\n    },\\n    \\"grid_table_crud\\": {\\n      \\"title_color\\": \\"#FFFFFF\\",\\n      \\"text_color\\": \\"#FFFFFF\\",\\n      \\"background_color\\": \\"#2B2A2A\\",\\n      \\"head_background\\": \\"#111827\\",\\n      \\"head_text_color\\": \\"#FFFFFF\\",\\n      \\"row_text_color\\": \\"#FFFFFF\\",\\n      \\"row_text_select\\": \\"#FFFFFF\\",\\n      \\"row_select\\": \\"#1e3a8a\\",\\n      \\"button_group_disabled\\": \\"#BEBFC2\\",\\n      \\"button_cargar_excel\\": \\"#065F46\\",\\n      \\"button_crear\\": \\"#047857\\",\\n      \\"button_ver\\": \\"#4338CA\\",\\n      \\"button_editar\\": \\"#2563EB\\",\\n      \\"button_estado_usuario\\": \\"#D97706\\",\\n      \\"button_eliminar_individual\\": \\"#DC2626\\",\\n      \\"button_eliminar_multiple\\": \\"#991B1B\\",\\n      \\"button_asignar_permisos\\": \\"#CA8A04\\",\\n      \\"button_asignar_productos\\": \\"#7C3AED\\",\\n      \\"button_limpiar\\": \\"#4B5563\\"\\n    },\\n    \\"input\\": {\\n      \\"label_color\\": \\"#FFFFFF\\",\\n      \\"text_color_placeholder\\": \\"#9E9E95\\",\\n      \\"background_color\\": \\"#000000\\",\\n      \\"text_color\\": \\"#ffffff\\",\\n      \\"border_color\\": \\"#4cd523\\"\\n    },\\n    \\"modal\\": {\\n      \\"fieldset_line_color\\": \\"#0b4a75\\",\\n      \\"legend_text_color\\": \\"#FFFFFF\\",\\n      \\"label_text_color\\": \\"#FFFFFF\\",\\n      \\"head_text_color\\": \\"#FFFFFF\\",\\n      \\"head_background_color\\": \\"#242323\\",\\n      \\"back_color_background\\": \\"#2B2A2A\\",\\n      \\"button_cancel_background_color\\": \\"#8A8484\\",\\n      \\"button_cancel_text_color\\": \\"#FFFFFF\\",\\n      \\"button_save_background_color\\": \\"#047857\\",\\n      \\"button_save_text_color\\": \\"#FFFFFF\\",\\n      \\"button_update_background_color\\": \\"#2563EB\\",\\n      \\"button_update_text_color\\": \\"#FFFFFF\\",\\n      \\"footer_text_color\\": \\"#948F8F\\",\\n      \\"footer_background_color\\": \\"#242323\\"\\n    },\\n    \\"search\\": {\\n      \\"button_background_color\\": \\"#0A18F5\\",\\n      \\"body_color_text\\": \\"#FFFFFF\\",\\n      \\"back_color_background\\": \\"#1F1E1E\\",\\n      \\"icon_background_color\\": \\"#FFFFFF\\",\\n      \\"head_text_color\\": \\"#FFFFFF\\",\\n      \\"head_background_color\\": \\"#111827\\"\\n    },\\n    \\"report\\": {\\n      \\"button_background_color\\": \\"#469443\\",\\n      \\"back_color_background\\": \\"#948F8F\\",\\n      \\"icon_background_color\\": \\"#FFFFFF\\",\\n      \\"head_text_color\\": \\"#FFFFFF\\",\\n      \\"head_background_color\\": \\"#111827\\"\\n    }\\n  }\\n}"');

-- Dumping data for table coreman.mod_vars_var: ~2 rows (approximately)
INSERT INTO `mod_vars_var` (`id`, `nombre`, `valor`) VALUES
	(1, 'AppName', 'Core'),
	(2, 'BannerBienvenida', ' Bienvenido al core ');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
