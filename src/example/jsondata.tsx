import React, { FC, useEffect } from 'react';

const JsonData: FC<{ data: any, label?: string }> = ({ data, label }) => {

  let _data = data || {};
  label = label || '';

  useEffect(() => {
    _data = data || {};
  }, [data]);

  return (
    <div>
      {label && label.length ? (<><h3>{label}</h3><hr /></>) : null}
      {!data ? null : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default JsonData;
