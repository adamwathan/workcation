const svgToDataUri = require('mini-svg-data-uri')
const mergeWith = require('lodash/mergeWith')
const tap = require('lodash/tap')
const isUndefined = require('lodash/isUndefined')
const isFunction = require('lodash/isFunction')
const isArray = require('lodash/isArray')
const isPlainObject = require('lodash/isPlainObject')
const defaultOptions = require('./defaultOptions')
const parseObjectStyles = require('tailwindcss/lib/util/parseObjectStyles').default
const traverse = require('traverse')

// TODO:
// - Make multiselect look good by default

// TODO: Figure out how to do this well, maybe using traverse lib
// on npm, want to walk object and replace icon with backgroundImage
function mapValuesDeep(value, callback) {
  return _.isObject(value)
    ? _.mapValues(value, (v, k) => mapValuesDeep(v, callback))
    : callback()
}

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

module.exports = function ({ addUtilities, addComponents, theme, postcss }) {
  const components = []

  const collectComponents = (newComponents) => {
    components.push(newComponents)
  }

  function addBaseComponents() {
    collectComponents({
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
    collectComponents({
      [`.form-input${modifier}`]: {
        ...options,
      },
    })
  }

  function addTextarea(options, modifier = '') {
    collectComponents({
      [`.form-textarea${modifier}`]: {
        ...options,
      },
    })
  }

  function addMultiselect(options, modifier = '') {
    collectComponents({
      [`.form-multiselect${modifier}`]: {
        ...options,
      },
    })
  }

  function addSelect(options, modifier = '') {
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

    const defaultIcon = (iconColor) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}"><path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>`

    traverse(component).forEach(function (value) {
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

    console.log(component)
    collectComponents(component)
  }

  function addCheckbox(options, modifier = '') {
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

    const defaultIcon = (iconColor) => `<svg viewBox="0 0 16 16" fill="${iconColor}" xmlns="http://www.w3.org/2000/svg"><path d="M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z"/></svg>`

    traverse(component).forEach(function (value) {
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

    console.log(component)
    collectComponents(component)
  }

  function addRadio(options, modifier = '') {
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

    const defaultIcon = (iconColor) => `<svg viewBox="0 0 16 16" fill="${iconColor}" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`

    traverse(component).forEach(function (value) {
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

    console.log(component)
    collectComponents(component)
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
  addComponents(components)
}
