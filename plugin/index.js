const svgToDataUri = require('mini-svg-data-uri')
const mergeWith = require('lodash/mergeWith')
const isFunction = require('lodash/isFunction')
const isArray = require('lodash/isArray')
const isPlainObject = require('lodash/isPlainObject')
const defaultOptions = require('./defaultOptions')

function merge(...objects) {
  return mergeWith({}, ...objects, (objValue, srcValue, key, obj, src, stack) => {
    if (isPlainObject(srcValue)) {
      console.log(srcValue)
      return mergeWith(objValue, srcValue, merge)
    }
    return Object.keys(src).includes(key)
      ? (srcValue === undefined ? null : srcValue)
      : objValue
  })
}

// TODO:
// - Hover states ✅
// - Active states
// - Make multiselect look good by default
// - Disabled states
// - Color/size modifiers


module.exports = function ({ addUtilities, addComponents, theme }) {
  function addBaseComponents() {
    addUtilities({
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
      placeholder,
      hover: { placeholder: hoverPlaceholder, ...hover },
      focus: { placeholder: focusPlaceholder, ...focus },
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
      placeholder,
      hover: { placeholder: hoverPlaceholder, ...hover },
      focus: { placeholder: focusPlaceholder, ...focus },
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
        backgroundImage: `url("${svgToDataUri(isFunction(icon) ? icon(iconColor) : icon)}")`,
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
      checked: { focus: checkedFocus, hover: checkedHover, icon, iconColor, ...checked },
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
          backgroundImage: `url("${svgToDataUri(isFunction(icon) ? icon(iconColor) : icon)}")`,
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
      checked: { focus: checkedFocus, hover: checkedHover, icon, iconColor, ...checked },
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
          backgroundImage: `url("${svgToDataUri(isFunction(icon) ? icon(iconColor) : icon)}")`,
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

  addBaseComponents()

  Object.keys(theme('customForms')).forEach(key => {
    const modifier = key === 'default' ? '' : `-${key}`

    addInput(merge(defaultOptions.input, theme(`customForms.${key}.input`, {})), modifier)
    addTextarea(merge(defaultOptions.textarea, theme(`customForms.${key}.textarea`, {})), modifier)
    addMultiselect(merge(defaultOptions.multiselect, theme(`customForms.${key}.multiselect`, {})), modifier)
    addCheckbox(merge(defaultOptions.checkbox, theme(`customForms.${key}.checkbox`, {})), modifier)
    addRadio(merge(defaultOptions.radio, theme(`customForms.${key}.radio`, {})), modifier)
    addSelect(merge(defaultOptions.select, theme(`customForms.${key}.select`, {})), modifier)
  })
}
