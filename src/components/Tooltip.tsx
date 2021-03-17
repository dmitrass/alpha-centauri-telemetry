import * as React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

export const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const temp = payload[0].value

    const tempCondition = (temp) => {
      if (temp < 0) {
        return 'primary'
      } else if (temp < 51) {
        return 'success'
      } else {
        return 'danger'
      }
    }

    return (
      <div className="p-3 my-2 rounded bg-docs-transparent-grid">
        <Toast>
          <ToastHeader icon={tempCondition(temp)}>
            {`${payload[0].value} (°C)`}
          </ToastHeader>
          <ToastBody>
            {`Temperature at ${label} point` }
          </ToastBody>
        </Toast>
      </div>
    );
  }

  return null;
}