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
      text: 'Notificame cuando el sistema reconosca un efo en mis proovedores',
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
};

export default ConfigConstants;
