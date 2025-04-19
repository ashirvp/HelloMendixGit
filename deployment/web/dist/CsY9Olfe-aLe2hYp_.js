import { handleError, HandledError, toFriendlyId } from './index-C0bqjiJG.js';

function handleDataSourceExecutionError(widgetId, e, dataSourceType) {
  handleError(e instanceof HandledError ? e : new Error(`An error occurred while executing ${dataSourceType} data source for widget ${toFriendlyId(widgetId)}: ${e instanceof Error ? e.message : e}`));
}

export { handleDataSourceExecutionError };
