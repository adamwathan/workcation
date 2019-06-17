const dlv = require('dlv')
const svgToDataUri = require('mini-svg-data-uri')
const defaultTheme = require('tailwindcss/resolveConfig')(require('tailwindcss/defaultConfig')).theme
const merge = require('lodash/merge')
const isFunction = require('lodash/isFunction')

const customForms = function ({ addUtilities, addComponents, theme }) {
  const options = {
    horizontalPadding: defaultTheme.spacing[3],
    verticalPadding: defaultTheme.spacing[2],
    lineHeight: defaultTheme.lineHeight.normal,
    fontSize: defaultTheme.fontSize.base,
    borderColor: defaultTheme.borderColor.default,
    borderWidth: defaultTheme.borderWidth.default,
    borderRadius: defaultTheme.borderRadius.default,
    backgroundColor: defaultTheme.colors.white,
    focusBorderColor: defaultTheme.colors.blue[400],
    focusBoxShadow: defaultTheme.boxShadow.outline,
    boxShadow: defaultTheme.boxShadow.none,
    checkboxSize: '1em',
    radioSize: '1em',
    checkboxIcon: `<svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z"/></svg>`,
    radioIcon: `<svg viewBox="0 0 16 16" fill="#fff" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`,
    checkedColor: defaultTheme.colors.blue[500],
    selectIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${defaultTheme.colors.gray[500]}"><path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>`,
    selectIconOffset: defaultTheme.spacing[2],
    selectIconSize: '1.5em',
    ...theme('customForms'),
  }

  const defaultOptions = {
    select: {
      appearance: 'none',
      backgroundRepeat: 'no-repeat',
      colorAdjust: 'exact',
      backgroundColor: defaultTheme.colors.white,
      borderColor: defaultTheme.borderColor.default,
      borderWidth: defaultTheme.borderWidth.default,
      borderRadius: defaultTheme.borderRadius.default,
      paddingTop: defaultTheme.spacing[2],
      paddingRight: defaultTheme.spacing[10],
      paddingBottom: defaultTheme.spacing[2],
      paddingLeft: defaultTheme.spacing[3],
      fontSize: defaultTheme.fontSize.base,
      lineHeight: defaultTheme.lineHeight.normal,
      iconColor: defaultTheme.colors.gray[500],
      icon: (iconColor) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}"><path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>`,
      backgroundPosition: `right ${defaultTheme.spacing[2]} center`,
      backgroundSize: `1.5em 1.5em`,
      focus: {
        outline: 'none',
        boxShadow: defaultTheme.boxShadow.outline,
        borderColor: defaultTheme.colors.blue[400],
      }
    },
    checkbox: {
      appearance: 'none',
      display: 'inline-block',
      verticalAlign: 'middle',
      backgroundOrigin: 'border-box',
      userSelect: 'none',
      colorAdjust: 'exact',
      flexShrink: 0,
      height: '1em',
      width: '1em',
      borderColor: defaultTheme.borderColor.default,
      borderWidth: defaultTheme.borderWidth.default,
      borderRadius: defaultTheme.borderRadius.default,
      backgroundColor: defaultTheme.colors.white,
      focus: {
        outline: 'none',
        boxShadow: defaultTheme.boxShadow.outline,
        borderColor: defaultTheme.colors.blue[400],
      },
      checked: {
        backgroundColor: defaultTheme.colors.blue[500],
        borderColor: defaultTheme.colors.blue[500],
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        iconColor: defaultTheme.colors.white,
        icon: (iconColor) => `<svg viewBox="0 0 16 16" fill="${iconColor}" xmlns="http://www.w3.org/2000/svg"><path d="M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z"/></svg>`,
      },
    }
  }

  const selectOptions = merge({}, defaultOptions.select, theme('customForms.default.select', {}))
  const extraSelectOptions = (({
    icon,
    iconColor,
    focus,
    ...rest
  }) => rest)(selectOptions)

  addComponents({
    '.form-select': {
      backgroundImage: `url("${svgToDataUri(isFunction(selectOptions.icon) ? selectOptions.icon(selectOptions.iconColor) : selectOptions.icon)}")`,
      ...extraSelectOptions,
      '&::-ms-expand': {
        border: 'none', // The select padding is causing some whitespace around the chevron which looks weird with a border
        color: selectOptions.iconColor, // Chevron color
        '@media not print': {
          display: 'none',
        },
      },
      '@media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none)': {
        paddingRight: selectOptions.paddingLeft, // Fix padding for print in IE
      },
      '&:focus': {
        ...selectOptions.focus
      }
    },
  })

  const checkboxOptions = merge({}, defaultOptions.checkbox, theme('customForms.default.checkbox', {}))
  const extraCheckboxOptions = (({
    focus,
    checked,
    ...rest
  }) => rest)(checkboxOptions)
  const extraCheckboxCheckedOptions = (({
    icon,
    iconColor,
    focus,
    ...rest
  }) => rest)(checkboxOptions.checked)

  addComponents({
    '.form-checkbox': {
      ...extraCheckboxOptions,
      '&:focus': {
        ...checkboxOptions.focus,
      },
      '&:checked': {
        backgroundImage: `url("${svgToDataUri(isFunction(checkboxOptions.checked.icon) ? checkboxOptions.checked.icon(checkboxOptions.checked.iconColor) : checkboxOptions.checked.icon)}")`,
        ...extraCheckboxCheckedOptions,
        '&:focus': {
          ...checkboxOptions.checked.focus,
        }
      },
      '&::-ms-check': {
        '@media not print': {
          color: 'transparent', // Hide the check
          background: 'inherit',
          borderColor: 'inherit',
          borderRadius: 'inherit',
          borderWidth: extraCheckboxOptions.borderWidth,
        }
      },
    },
  })

  addComponents({
    '.form-radio': {
      appearance: 'none',
      boxShadow: options.boxShadow,
      display: 'inline-block',
      height: options.radioSize,
      width: options.radioSize,
      verticalAlign: 'middle',
      color: options.checkedColor,
      borderColor: options.borderColor,
      borderWidth: options.borderWidth,
      borderRadius: '50%',
      backgroundColor: options.backgroundColor,
      backgroundOrigin: 'border-box',
      userSelect: 'none',
      colorAdjust: 'exact',
      flexShrink: 0,
      '&:focus': {
        outline: 'none',
        boxShadow: options.focusBoxShadow,
      },
      '&:focus:not(:checked)': {
        borderColor: options.focusBorderColor,
      },
      '&:checked': {
        backgroundColor: 'currentColor',
        borderColor: 'currentColor',
        backgroundImage: `url("${svgToDataUri(options.radioIcon)}")`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
      '&::-ms-check': {
        '@media not print': {
          color: 'transparent', // Hide the dot
          background: 'inherit',
          borderColor: 'inherit',
          borderRadius: 'inherit',
          borderWidth: options.borderWidth,
        },
      },
    },
    '.form-input, .form-textarea, .form-multiselect': {
      appearance: 'none',
      backgroundColor: options.backgroundColor,
      borderColor: options.borderColor,
      borderWidth: options.borderWidth,
      borderRadius: options.borderRadius,
      boxShadow: options.boxShadow,
      padding: `${options.verticalPadding} ${options.horizontalPadding}`,
      fontSize: options.fontSize,
      lineHeight: options.lineHeight,
      '&:focus': {
        outline: 'none',
        boxShadow: options.focusBoxShadow,
        borderColor: options.focusBorderColor,
      }
    },
  })
}


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
      default: {
        // input: {
        //   lineHeight: theme('lineHeight.snug'),
        //   color: theme('colors.white'),
        //   borderColor: 'transparent',
        //   borderRadius: theme('borderRadius.lg'),
        //   backgroundColor: theme('colors.gray.700'),
        // },
        // textarea: {
        //   lineHeight: theme('lineHeight.snug'),
        //   color: theme('colors.white'),
        //   borderColor: 'transparent',
        //   borderRadius: theme('borderRadius.lg'),
        //   backgroundColor: theme('colors.gray.700'),
        // },
        // multiselect: {
        //   lineHeight: theme('lineHeight.snug'),
        //   color: theme('colors.white'),
        //   borderColor: 'transparent',
        //   borderRadius: theme('borderRadius.lg'),
        //   backgroundColor: theme('colors.gray.900'),
        // },

        select: {
          lineHeight: theme('lineHeight.snug'),
          color: theme('colors.white'),
          backgroundColor: theme('colors.gray.700'),
          borderColor: 'transparent',
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.default'),
          iconColor: '#fff',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>`,
          focus: {
            borderColor: 'transparent',
            backgroundColor: theme('colors.gray.600'),
            boxShadow: 'none',
          }
        },

        checkbox: {
          backgroundColor: theme('colors.gray.900'),
          borderColor: 'transparent',
          borderRadius: theme('borderRadius.default'),
          height: '1em',
          width: '1em',
          focus: {
            backgroundColor: theme('colors.gray.700'),
            borderColor: 'transparent',
            boxShadow: 'none',
          },
          checked: {
            iconColor: '#fff',
            backgroundColor: theme('colors.indigo.500'),
            borderColor: 'transparent',
            focus: {
              backgroundColor: theme('colors.indigo.400'),
            }
          }
        },

        // radio: {
        //   backgroundColor: theme('colors.gray.900'),
        //   borderColor: 'transparent',
        //   height: '1em',
        //   width: '1em',
        //   focus: {
        //     backgroundColor: theme('colors.gray.700'),
        //     borderColor: 'transparent',
        //     boxShadow: 'none',
        //   },
        //   checked: {
        //     // iconColor: '#fff' ?
        //     backgroundColor: theme('colors.indigo.500'),
        //   }
        // },
      }
    })
  },
  variants: {},
  plugins: [
    customForms,
  ]
}
