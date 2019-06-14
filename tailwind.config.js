module.exports = {
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '80': '20rem',
      },
      padding: {
        '5/6': '83.3333333%'
      }
    },
    customForms: theme => ({
      // horizontalPadding: defaultTheme.spacing[3],
      // verticalPadding: defaultTheme.spacing[2],
      lineHeight: theme('lineHeight.snug'),
      // fontSize: defaultTheme.fontSize.base,
      borderColor: 'transparent',
      // borderWidth: defaultTheme.borderWidth.default,
      borderRadius: theme('borderRadius.lg'),
      backgroundColor: theme('colors.gray.700'),
      focusBorderColor: 'transparent',
      focusShadow: 'none',
      // boxShadow: defaultTheme.boxShadow.none,
      checkboxSize: '1.5em',
      radioSize: '1.5em',
      // checkboxIcon: `<svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z"/></svg>`,
      // radioIcon: `<svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`,
      checkedColor: theme('colors.indigo.500'),
      selectIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>`,
      // selectIconOffset: defaultTheme.spacing[2],
      // selectIconSize: '1.5em',
    })
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}
