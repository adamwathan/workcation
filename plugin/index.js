const svgToDataUri = require('mini-svg-data-uri')
const mergeWith = require('lodash/mergeWith')
const tap = require('lodash/tap')
const isEmpty = require('lodash/isEmpty')
const isUndefined = require('lodash/isUndefined')
const isFunction = require('lodash/isFunction')
const isArray = require('lodash/isArray')
const isPlainObject = require('lodash/isPlainObject')
const defaultOptions = require('./defaultOptions')
const traverse = require('traverse')
const _ = require('lodash')

// TODO:
// - Make multiselect look good by default

function merge(...options) {
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

  return mergeWith({}, ...options, mergeCustomizer)
}

function flattenOptions(options) {
  return merge(..._(options).toPairs().flatMap(([keys, value]) => {
    return _.fromPairs(keys.split(', ').map(key => [key, value]))
  }))
}

function replaceIconDeclarations(component, defaultIcon) {
  return traverse(component).map(function (value) {
    if (!isPlainObject(value)) {
      return
    }

    if (Object.keys(value).includes('iconColor') || Object.keys(value).includes('icon')) {
      const { iconColor, icon, ...rest } = value
      this.update({
        ...rest,
        backgroundImage: `url("${svgToDataUri(isUndefined(icon) ? defaultIcon(iconColor) : (isFunction(icon) ? icon(iconColor) : icon))}")`
      })
    }
  })
}

module.exports = function ({ addUtilities, addComponents, theme, postcss }) {
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
    if (isEmpty(options)) {
      return
    }

    addComponents({
      [`.form-input${modifier}`]: {
        ...options,
      },
    })
  }

  function addTextarea(options, modifier = '') {
    if (isEmpty(options)) {
      return
    }

    addComponents({
      [`.form-textarea${modifier}`]: {
        ...options,
      },
    })
  }

  function addMultiselect(options, modifier = '') {
    if (isEmpty(options)) {
      return
    }

    addComponents({
      [`.form-multiselect${modifier}`]: {
        ...options,
      },
    })
  }

  function addSelect(options, modifier = '') {
    if (isEmpty(options)) {
      return
    }

    const defaultIcon = (iconColor) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}"><path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>`
    const component = {
      [`.form-select${modifier}`]: {
        ...merge({
          '&::-ms-expand': {
            color: options.iconColor,
          },
          ...isUndefined(options.paddingLeft) ? {} : {
            '@media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none)': {
              paddingRight: options.paddingLeft, // Fix padding for print in IE
            },
          },
        }, options)
      },
    }

    addComponents(replaceIconDeclarations(component, defaultIcon))
  }

  function addCheckbox(options, modifier = '') {
    if (isEmpty(options)) {
      return
    }

    const defaultIcon = (iconColor) => `<svg viewBox="0 0 16 16" fill="${iconColor}" xmlns="http://www.w3.org/2000/svg"><path d="M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z"/></svg>`
    const component = {
      [`.form-checkbox${modifier}`]: {
        ...merge({
          ...isUndefined(options.borderWidth) ? {} : {
            '&::-ms-check': {
              '@media not print': {
                borderWidth: options.borderWidth,
              }
            },
          },
        }, options)
      },
    }

    addComponents(replaceIconDeclarations(component, defaultIcon))
  }

  function addRadio(options, modifier = '') {
    if (isEmpty(options)) {
      return
    }

    const defaultIcon = (iconColor) => `<svg viewBox="0 0 16 16" fill="${iconColor}" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`
    const component = {
      [`.form-radio${modifier}`]: {
        ...merge({
          ...isUndefined(options.borderWidth) ? {} : {
            '&::-ms-check': {
              '@media not print': {
                borderWidth: options.borderWidth,
              }
            },
          },
        }, options)
      },
    }

    addComponents(replaceIconDeclarations(component, defaultIcon))
  }

  function registerComponents() {
    addBaseComponents()

    const userOptions = {
      default: {},
      ..._(theme('customForms')).map((value, key) => {
        return [key, {
          input: {},
          textarea: {},
          multiselect: {},
          select: {},
          checkbox: {},
          radio: {},
          ...flattenOptions(value),
        }]
      }).fromPairs().value()
    }

    addInput(merge(defaultOptions.input, userOptions.default.input))
    addTextarea(merge(defaultOptions.textarea, userOptions.default.textarea))
    addMultiselect(merge(defaultOptions.multiselect, userOptions.default.multiselect))
    addSelect(merge(defaultOptions.select, userOptions.default.select))
    addCheckbox(merge(defaultOptions.checkbox, userOptions.default.checkbox))
    addRadio(merge(defaultOptions.radio, userOptions.default.radio))

    Object.keys((({ default: _default, ...rest }) => rest)(userOptions)).forEach(key => {
      const modifier = `-${key}`

      addInput(userOptions[key].input, modifier)
      addTextarea(userOptions[key].textarea, modifier)
      addMultiselect(userOptions[key].multiselect, modifier)
      addSelect(userOptions[key].select, modifier)
      addCheckbox(userOptions[key].checkbox, modifier)
      addRadio(userOptions[key].radio, modifier)
    })
  }

  registerComponents()
}
