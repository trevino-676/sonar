const ConfigConstants = {
  GET_CONFIG_REQUEST: 'GET_CONFIG_REQUEST',
  GET_CONFIG_SUCCESS: 'GET_CONFIG_SUCCESS',
  GET_CONFIG_FAIL: 'GET_CONFIG_FAIL',
  SAVE_CONFIG_REQUEST: 'SAVE_CONFIG_REQUEST',
  SAVE_CONFIG_SUCCESS: 'SAVE_CONFIG_SUCCESS',
  SAVE_CONFIG_FAIL: 'SAVE_CONFIG_FAIL',
  UPDATE_CONFIG_REQUEST: 'UPDATE_CONFIG_REQUEST',
  UPDATE_CONFIG_SUCCESS: 'UPDATE_CONFIG_SUCCESS',
  UPDATE_CONFIG_FAIL: 'UPDATE_CONFIG_FAIL',
  GET_FAIL_MESSAGE: 'Hubo un error al obtener la configuracion del usuario',
  SAVE_FAIL_MESSAGE: 'Hubo un error al guardar la configuracion del usuario',
  // Notifications
  NOTIFICATIONS: [
    {
      name: 'efo',
      text: 'Notificame cuando el sistema reconosca un EFO en mis proovedores',
      value: 'efo',
    },
    {
      name: 'payment_complement',
      text: 'Notificame cuando el sistema encuentre diferencias en mis complementos de pagos',
      value: 'payment_complement',
    },
    {
      name: 'system',
      text: 'Notificame cuando haya novedades en el sistema',
      value: 'system',
    },
  ],
  REMINDERS_SCHEDULER: [
    {
      name: 'daily',
      text: 'Diario',
      value: 'daily',
    },
    {
      name: 'weekly',
      text: 'Semanal',
      value: 'weekly',
    },
    {
      name: 'fortnightly',
      value: 'fortnightly',
      text: 'Quincenal',
    },
    {
      name: 'monthly',
      value: 'monthly',
      text: 'Mensual',
    },
  ],

  RPAS_SCHEDULER: [
    {
      name: 'monday',
      text: 'Lunes',
      value: 'Monday',
    },
    {
      name: 'tuesday',
      text: 'Martes',
      value: 'Tuesday',
    },
    {
      name: 'wednesday',
      text: 'Miércoles',
      value: 'Wednesday',
    },
    {
      name: 'thursday',
      text: 'Jueves',
      value: 'Thursday',
    },
    {
      name: 'friday',
      text: 'Viernes',
      value: 'Friday',
    },
    {
      name: 'saturday',
      text: 'Sabado',
      value: 'Saturday',
    },
    {
      name: 'sunday',
      text: 'Domingo',
      value: 'Sunday',
    },
  ],
};

export default ConfigConstants;
