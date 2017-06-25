define(['./interface', 'core/UIComponent', 'core/t', 'utils'], function (Input, UIComponent, __t, Utils) {
  return UIComponent.extend({
    id: 'checkboxes',
    dataTypes: ['VARCHAR'],
    variables: [
      {id: 'options', default_value: '', ui: 'json', options: {rows: 25, placeholder_text: '{\n    "value1": "Option One",\n    "value2": "Option Two",\n    "value3": "Option Three"\n}'}, comment: __t('select_options_comment'), required: true},
      {id: 'delimiter', default_value: ',', ui: 'text_input', length: 1, required: true},
      {id: 'list_view_formatting', ui: 'radio_buttons', default_value: 'text', options: {options: {text: 'Display Text', value: 'Value'}}}
    ],
    Input: Input,
    validate: function (value, options) {
      if (options.schema.isRequired() && Utils.isEmpty(value)) {
        return __t('this_field_is_required');
      }
    },
    list: function (options) {
      // Convert default csv to csv with spaces => demo1,demo2 => demo1, demo2
      var showAsText = options.settings.get('list_view_formatting') === 'text';
      return options.value.split(options.settings.get('delimiter'))
        .filter(function (value) {
          // Filter out the first and last empty delimiter
          return value.length > 0;
        })
        .map(function (value) {
          if (showAsText) {
            var displayOptions = JSON.parse(options.settings.get('options'));
            return displayOptions[value];
          }

          return value;
        })
        .reduce(function (string, value) {
          return string + ', ' + value;
        });
    }
  });
});