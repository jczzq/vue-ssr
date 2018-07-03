export default {
  name: 'empty',
  props: ['placeholder'],
  render (h) {
    return h(
      'div',
      {
        class: ['empty-component-placeholder']
      }
    )
  }
}
