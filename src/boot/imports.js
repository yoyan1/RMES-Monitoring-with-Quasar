// // src/boot/auto-import-components.js
// import { boot } from 'quasar/wrappers'
// import { defineAsyncComponent } from 'vue'

// export default boot(({ app }) => {
//   const requireComponent = require.context(
//     '../components',
//     false,
//     /[A-Z]\w+\.(vue|js)$/
//   )

//   requireComponent.keys().forEach(fileName => {
//     const componentConfig = requireComponent(fileName)
//     const componentName = fileName
//       .split('/')
//       .pop()
//       .replace(/\.\w+$/, '')

//     app.component(
//       componentName,
//       defineAsyncComponent(() => componentConfig.default || componentConfig)
//     )
//   })
// })
