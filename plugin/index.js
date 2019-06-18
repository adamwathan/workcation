const svgToDataUri = require('mini-svg-data-uri')
const mergeWith = require('lodash/mergeWith')
const isUndefined = require('lodash/isUndefined')
const isFunction = require('lodash/isFunction')
const isArray = require('lodash/isArray')
const isPlainObject = require('lodash/isPlainObject')
const defaultOptions = require('./defaultOptions')

// TODO:
// - Hover states ✅
// - Active states
// - Make multiselect look good by default
// - Disabled states
// - Color/size modifiers

function merge(defaultOptions, userOptions) {
  function mergeCustomizer(objValue, srcValue, key, obj, src, stack) {
    if (isPlainObject(srcValue)) {
      return mergeWith(objValue, srcValue, mergeCustomizer)
    }
    return Object.keys(src).includes(key)
      // Convert undefined to null otherwise lodash won't replace the key
      // PostCSS still omits properties with a null value so it behaves
      // the same as undefined.
      ? (srcValue === undefined ? null : srcValue)
      : objValue
  }

  return mergeWith({}, defaultOptions, userOptions, mergeCustomizer)
}

module.exports = function ({ addUtilities, addComponents, theme }) {
  function addBaseComponents() {
    addComponents({
      '.form-input': {
        appearance: 'none',
      },
      '.form-textarea': {
        appearance: 'none',
      },
      '.form-multiselect': {
        appearance: 'none',
      },
      '.form-select': {
        appearance: 'none',
        colorAdjust: 'exact',
        '&::-ms-expand': {
          border: 'none', // The select padding is causing some whitespace around the chevron which looks weird with a border
          '@media not print': {
            display: 'none',
          },
        },
      },
      '.form-checkbox': {
        appearance: 'none',
        colorAdjust: 'exact',
        '&::-ms-check': {
          '@media not print': {
            color: 'transparent', // Hide the check
            background: 'inherit',
            borderColor: 'inherit',
            borderRadius: 'inherit',
          }
        },
      },
      '.form-radio': {
        appearance: 'none',
        colorAdjust: 'exact',
        '&::-ms-check': {
          '@media not print': {
            color: 'transparent', // Hide the check
            background: 'inherit',
            borderColor: 'inherit',
            borderRadius: 'inherit',
          }
        },
      },
    })
  }

  function addInput(options, modifier = '') {
    const {
      placeholder = {},
      hover: { placeholder: hoverPlaceholder, ...hover } = {},
      focus: { placeholder: focusPlaceholder, ...focus } = {},
      ...base
    } = options

    addComponents({
      [`.form-input${modifier}`]: {
        ...base,
        '&::placeholder': {
          ...placeholder,
        },
        '&:hover': {
          ...hover,
        },
        '&:hover::placeholder': {
          ...hoverPlaceholder,
        },
        '&:focus': {
          ...focus,
        },
        '&:focus::placeholder': {
          ...focusPlaceholder,
        },
      },
    })
  }

  function addTextarea(options, modifier = '') {
    const {
      placeholder = {},
      hover: { placeholder: hoverPlaceholder, ...hover } = {},
      focus: { placeholder: focusPlaceholder, ...focus } = {},
      ...base
    } = options

    addComponents({
      [`.form-textarea${modifier}`]: {
        ...base,
        '&::placeholder': {
          ...placeholder,
        },
        '&:hover': {
          ...hover,
        },
        '&:hover::placeholder': {
          ...hoverPlaceholder,
        },
        '&:focus': {
          ...focus,
        },
        '&:focus::placeholder': {
          ...focusPlaceholder,
        },
      },
    })
  }

  function addMultiselect(options, modifier = '') {
    const {
      hover,
      focus,
      ...base
    } = options

    addComponents({
      [`.form-multiselect${modifier}`]: {
        ...base,
        '&:hover': {
          ...hover,
        },
        '&:focus': {
          ...focus,
        },
      },
    })
  }

  function addSelect(options, modifier = '') {
    const {
      icon,
      iconColor,
      hover,
      focus,
      ...base
    } = options

    addComponents({
      [`.form-select${modifier}`]: {
          ...isUndefined(icon) ? {} : { backgroundImage: `url("${svgToDataUri(isFunction(icon) ? icon(iconColor) : icon)}")` },
        ...base,
        '&::-ms-expand': {
          color: iconColor, // Chevron color
        },
        '@media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none)': {
          paddingRight: base.paddingLeft, // Fix padding for print in IE
        },
        '&:hover': {
          ...hover,
        },
        '&:focus': {
          ...focus,
        },
      },
    })
  }

  function addCheckbox(options, modifier = '') {
    const {
      checked: { focus: checkedFocus, hover: checkedHover, icon, iconColor, ...checked } = {},
      hover,
      focus,
      ...base
    } = options

    addComponents({
      [`.form-checkbox${modifier}`]: {
        ...base,
        '&:hover': {
          ...hover,
        },
        '&:focus': {
          ...focus,
        },
        '&:checked': {
          ...isUndefined(icon) ? {} : { backgroundImage: `url("${svgToDataUri(isFunction(icon) ? icon(iconColor) : icon)}")` },
          ...checked,
          '&:hover': {
            ...checkedHover,
          },
          '&:focus': {
            ...checkedFocus,
          }
        },
        '&::-ms-check': {
          '@media not print': {
            borderWidth: base.borderWidth,
          }
        },
      },
    })
  }

  function addRadio(options, modifier = '') {
    const {
      checked: { focus: checkedFocus, hover: checkedHover, icon, iconColor, ...checked } = {},
      hover,
      focus,
      ...base
    } = options

    addComponents({
      [`.form-radio${modifier}`]: {
        ...base,
        '&:hover': {
          ...hover,
        },
        '&:focus': {
          ...focus,
        },
        '&:checked': {
          ...isUndefined(icon) ? {} : { backgroundImage: `url("${svgToDataUri(isFunction(icon) ? icon(iconColor) : icon)}")` },
          ...checked,
          '&:hover': {
            ...checkedHover,
          },
          '&:focus': {
            ...checkedFocus,
          }
        },
        '&::-ms-check': {
          '@media not print': {
            borderWidth: base.borderWidth,
          }
        },
      },
    })
  }

  function registerComponents() {
    addBaseComponents()

    addInput(merge(defaultOptions.input, theme(`customForms.default.input`, {})))
    addTextarea(merge(defaultOptions.textarea, theme(`customForms.default.textarea`, {})))
    addMultiselect(merge(defaultOptions.multiselect, theme(`customForms.default.multiselect`, {})))
    addSelect(merge(defaultOptions.select, theme(`customForms.default.select`, {})))
    addCheckbox(merge(defaultOptions.checkbox, theme(`customForms.default.checkbox`, {})))
    addRadio(merge(defaultOptions.radio, theme(`customForms.default.radio`, {})))

    Object.keys((({ default: _, ...rest }) => rest)(theme('customForms'))).forEach(key => {
      const modifier = `-${key}`

      addInput(theme(`customForms.${key}.input`, {}), modifier)
      addTextarea(theme(`customForms.${key}.textarea`, {}), modifier)
      addMultiselect(theme(`customForms.${key}.multiselect`, {}), modifier)
      addSelect(theme(`customForms.${key}.select`, {}), modifier)
      addCheckbox(theme(`customForms.${key}.checkbox`, {}), modifier)
      addRadio(theme(`customForms.${key}.radio`, {}), modifier)
    })
  }

  registerComponents()
}
