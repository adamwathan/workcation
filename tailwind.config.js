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
      light: {
        input: {
          backgroundColor: theme('colors.white'),
          borderColor: theme('borderColor.default'),
          placeholder: {
            color: theme('colors.gray.500'),
          },
          focus: {
            borderColor: theme('colors.blue.400'),
            boxShadow: theme('boxShadow.outline'),
            placeholder: {
              color: theme('colors.gray.500'),
            },
          }
        }
      },
      default: {
        input: {
          lineHeight: theme('lineHeight.snug'),
          color: theme('colors.white'),
          backgroundColor: theme('colors.gray.900'),
          borderColor: 'transparent',
          borderRadius: theme('borderRadius.lg'),
          placeholder: {
            color: theme('colors.gray.600'),
          },
          focus: {
            borderColor: undefined,
            boxShadow: undefined,
            color: theme('colors.gray.900'),
            backgroundColor: theme('colors.white'),
            placeholder: {
              color: theme('colors.gray.500'),
            },
          },
          hover: {
            borderColor: theme('colors.red.600'),
          },
        },

        textarea: {
          lineHeight: theme('lineHeight.snug'),
          color: theme('colors.white'),
          backgroundColor: theme('colors.gray.900'),
          borderColor: 'transparent',
          borderRadius: theme('borderRadius.lg'),
          placeholder: {
            color: theme('colors.gray.600'),
          },
          focus: {
            borderColor: undefined,
            boxShadow: undefined,
            color: theme('colors.gray.900'),
            backgroundColor: theme('colors.white'),
            placeholder: {
              color: theme('colors.gray.500'),
            },
          },
          hover: {
            borderColor: theme('colors.red.600'),
          },
        },

        multiselect: {
          lineHeight: theme('lineHeight.snug'),
          color: theme('colors.white'),
          backgroundColor: theme('colors.gray.900'),
          borderColor: 'transparent',
          borderRadius: theme('borderRadius.lg'),
          placeholder: {
            color: theme('colors.gray.600'),
          },
          focus: {
            borderColor: undefined,
            boxShadow: undefined,
            color: theme('colors.gray.900'),
            backgroundColor: theme('colors.white'),
            placeholder: {
              color: theme('colors.gray.500'),
            },
          },
          hover: {
            borderColor: theme('colors.red.600'),
          },
        },

        select: {
          lineHeight: theme('lineHeight.snug'),
          color: theme('colors.white'),
          backgroundColor: theme('colors.gray.700'),
          borderColor: 'transparent',
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.default'),
          iconColor: '#fff',
          focus: {
            borderColor: undefined,
            boxShadow: undefined,
            backgroundColor: theme('colors.gray.600'),
          },
          hover: {
            borderColor: theme('colors.red.600'),
          },
        },

        checkbox: {
          backgroundColor: theme('colors.gray.900'),
          borderColor: 'transparent',
          height: '1.5em',
          width: '1.5em',
          focus: {
            borderColor: undefined,
            boxShadow: undefined,
            backgroundColor: theme('colors.gray.700'),
          },
          hover: {
            borderColor: theme('colors.red.600'),
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

        radio: {
          backgroundColor: theme('colors.gray.900'),
          borderColor: 'transparent',
          height: '1.5em',
          width: '1.5em',
          focus: {
            borderColor: undefined,
            boxShadow: undefined,
            backgroundColor: theme('colors.gray.700'),
          },
          hover: {
            borderColor: theme('colors.red.600'),
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
      }
    })
  },
  variants: {},
  plugins: [
    require('./plugin'),
  ]
}
