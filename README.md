# Prueba Técnica BimboNet - Sistema de Gestión de Bromas

## 📋 Descripción del Proyecto

Este proyecto es una **prueba técnica para BimboNet** que implementa un sistema de gestión de bromas utilizando la API de JokeAPI. La aplicación permite a los usuarios autenticados gestionar bromas de diferentes categorías con funcionalidades específicas según su rol de usuario.

## 🚀 Tecnologías Utilizadas

### Framework Principal
- **Angular 19.2.0** - Framework principal de la aplicación

### Librerías Principales
- **@ngx-translate/core (17.0.0)** - Internacionalización multiidioma
- **@ngx-translate/http-loader (17.0.0)** - Cargador HTTP para traducciones
- **@sweetalert2/ngx-sweetalert2 (14.0.0)** - Alertas y modales elegantes
- **tailwindcss (4.1.13)** - Framework CSS utilitario
- **@tailwindcss/postcss (4.1.13)** - Integración de Tailwind con PostCSS

### Características Técnicas Avanzadas
- **Angular Standalone Components** - Componentes independientes sin módulos
- **Angular Signals** - Sistema reactivo moderno de Angular
- **Reactive Forms** - Formularios reactivos con validaciones personalizadas
- **Guards de Rutas** - Protección de rutas con autenticación
- **Pipes Personalizados** - Filtros customizados para la aplicación

## 🌐 API Externa

La aplicación utiliza **JokeAPI v2** para obtener bromas de diferentes categorías:
- **Documentación**: [https://v2.jokeapi.dev/](https://v2.jokeapi.dev/)
- **Endpoint**: `https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?amount=10&safe-mode`
- **Categorías soportadas**: Programming, Spooky, Christmas
- **Modo seguro**: Activado para filtrar contenido inapropiado

## 👥 Cuentas de Prueba

El sistema incluye dos cuentas de usuario para testing:

### Gerente (Manager)
```
Email: jlopez@grupobimbo.com
Password: 123!*
Rol: manager
```

### Coordinador (Coordinator)
```
Email: drodriguez@grupobimbo.com
Password: 124!*
Rol: coordinator
```

## 🔐 Sistema de Roles y Permisos

### Gerente (Manager)
- ✅ **Crear** nuevas bromas
- ✅ **Editar** bromas existentes
- ✅ **Eliminar** bromas
- ✅ **Marcar como destacado** cualquier broma
- ✅ **Ver** todas las bromas

### Coordinador (Coordinator)
- ✅ **Crear** nuevas bromas
- ✅ **Marcar como destacado** cualquier broma
- ✅ **Ver** todas las bromas
- ❌ **NO puede editar** bromas existentes
- ❌ **NO puede eliminar** bromas

## 🌍 Funcionalidades Implementadas

### ✅ Requisitos Obligatorios

#### 1. **Sistema de Roles**
- Implementación completa de roles con permisos diferenciados
- Interfaz adaptativa según el rol del usuario
- Protección a nivel de componente para acciones restringidas

#### 2. **Gestión de Bromas Destacadas**
- Funcionalidad para marcar/desmarcar bromas como destacadas
- Sección especial para visualizar contenido destacado
- Persistencia en localStorage

#### 3. **CRUD de Bromas**
- **Crear**: Formulario completo con validaciones personalizadas
- **Leer**: Visualización en grid responsivo con filtros
- **Actualizar**: Edición de bromas existentes (solo gerentes)
- **Eliminar**: Eliminación con confirmación (solo gerentes)

#### 4. **Diseño Responsivo**
- Implementación completa con Tailwind CSS
- Breakpoints para móvil, tablet y desktop
- Menú hamburguesa para dispositivos móviles

### ⭐ Funcionalidades Extra (Puntos Adicionales)

#### 1. **Multiidioma (i18n)**
- Soporte completo para **Español** e **Inglés**
- Implementación con `@ngx-translate`
- Cambio dinámico de idioma con persistencia
- Archivos de traducción en `/public/i18n/`

#### 2. **Pipe Personalizado**
- **FilterDestacadosPipe**: Filtra bromas destacadas
- Uso en componentes para separar contenido destacado

#### 3. **Angular Standalone Components**
- Todos los componentes son standalone
- Sin uso de módulos tradicionales
- Configuración moderna con `app.config.ts`

#### 4. **Angular Signals**
- Implementación extensiva de signals en toda la aplicación
- Estado reactivo para filtros, menús móviles y datos
- Reemplazo de BehaviorSubject en varios casos

#### 5. **Sin Angular Material**
- Implementación completa con Tailwind CSS
- Componentes UI personalizados
- SweetAlert2 para modales y alertas

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── guards/           # Guards de autenticación
│   │   ├── layout/           # Layout principal
│   │   ├── models/           # Interfaces TypeScript
│   │   ├── pages/            # Páginas principales
│   │   └── services/         # Servicios de la aplicación
│   ├── shared/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── forms/           # Formularios
│   │   ├── pipes/           # Pipes personalizados
│   │   └── validators/      # Validadores personalizados
│   ├── app.config.ts        # Configuración de la aplicación
│   ├── app.routes.ts        # Rutas de la aplicación
│   └── app.component.ts     # Componente raíz
└── styles.css               # Estilos globales
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/luisvega1/prueba-bimbonet.git
cd prueba-bimbonet
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

## 📱 Funcionalidades de la Interfaz

### Página de Login
- Formulario de autenticación con validaciones
- Soporte multiidioma
- Redirección automática según rol

### Dashboard Principal
- **Sección de Destacados**: Bromas marcadas como favoritas
- **Sección de Todas las Bromas**: Lista completa con filtros
- **Filtros Disponibles**:
  - Por categoría (Programming, Spooky, Christmas)
  - Ordenamiento alfabético
- **Botón de Agregar**: Acceso rápido para crear nuevas bromas

### Formulario de Bromas
- **Validaciones Personalizadas**:
  - Bromas simples: mínimo 20 caracteres
  - Bromas de dos partes: ambos campos obligatorios
- **Tipos de Broma**:
  - **Single**: Una sola línea de texto
  - **Two-part**: Setup + Punchline
- **Categorías**: Programming, Spooky, Christmas
- **Checkbox de Destacado**: Para marcar como favorito

### Tarjetas de Bromas
- **Información mostrada**:
  - Categoría de la broma
  - Contenido completo (single o two-part)
  - Botones de acción según rol
- **Acciones disponibles**:
  - ⭐ Marcar/desmarcar como destacado
  - ✏️ Editar (solo gerentes)
  - 🗑️ Eliminar (solo gerentes)

## 🐛 Mejoras Identificadas

### Limitaciones Actuales
1. **Traducción de Bromas**: Los chistes obtenidos de la API externa no se pueden traducir automáticamente con los archivos i18n


## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado como parte de la prueba técnica para BimboNet.

---

- **Nota**: Este proyecto demuestra el uso de tecnologías modernas de Angular, incluyendo Standalone Components, Signals, y mejores prácticas de desarrollo frontend.
- **Nota**: Esta documentación (solamente documentación) fue creada con **apoyo** de ChatGPT.
