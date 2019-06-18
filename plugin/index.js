const svgToDataUri = require('mini-svg-data-uri')
const mergeWith = require('lodash/mergeWith')
const merge = require('lodash/merge')
const isFunction = require('lodash/isFunction')
const isArray = require('lodash/isArray')
const isPlainObject = require('lodash/isPlainObject')
const defaultOptions = require('./defaultOptions')

function merge(...objects) {
  return mergeWith({}, ...objects, (objValue, srcValue, key, obj, src, stack) => {
    if (isPlainObject(srcValue)) {
      return mergeWith(objValue, srcValue, reininkMerge)
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

  function addInput(options, modifier = '') {
    const {
      placeholder,
      hover: { placeholder: hoverPlaceholder, ...hover },
      focus: { placeholder: focusPlaceholder, ...focus },
      ...base
    } = options

    addComponents({
      '.form-input': {
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
      '.form-textarea': {
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
      '.form-multiselect': {
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
      '.form-select': {
        backgroundImage: `url("${svgToDataUri(isFunction(icon) ? icon(iconColor) : icon)}")`,
        ...base,
        '&::-ms-expand': {
          border: 'none', // The select padding is causing some whitespace around the chevron which looks weird with a border
          color: iconColor, // Chevron color
          '@media not print': {
            display: 'none',
          },
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
      '.form-checkbox': {
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
            color: 'transparent', // Hide the check
            background: 'inherit',
            borderColor: 'inherit',
            borderRadius: 'inherit',
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
      '.form-radio': {
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
            color: 'transparent', // Hide the check
            background: 'inherit',
            borderColor: 'inherit',
            borderRadius: 'inherit',
            borderWidth: base.borderWidth,
          }
        },
      },
    })
  }

  addInput(merge(defaultOptions.input, theme('customForms.default.input', {})), '')
  addTextarea(merge(defaultOptions.textarea, theme('customForms.default.textarea', {})), '')
  addMultiselect(merge(defaultOptions.multiselect, theme('customForms.default.multiselect', {})), '')
  addCheckbox(merge(defaultOptions.checkbox, theme('customForms.default.checkbox', {})), '')
  addRadio(merge(defaultOptions.radio, theme('customForms.default.radio', {})), '')
  addSelect(merge(defaultOptions.select, theme('customForms.default.select', {})), '')

}
