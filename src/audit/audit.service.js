import EventEmitter from 'events';
import Audit from '../models/audit.model.js';
import db from './../database/pool.js';

const eventEmitter = new EventEmitter();

eventEmitter.on('audit', async (audit) => {
  try {
    const values = [
      audit.audit_action,
      JSON.stringify(audit.audit_data),
      audit.audit_status,
      JSON.stringify(audit.audit_error),
      audit.audit_by,
    ];

    const sql = `INSERT INTO app_audit 
    (
      audit_action,
      audit_data,
      audit_status,
      audit_error,
      audit_by
    )
  VALUES
    ($1, $2, $3, $4, $5);`;

    const connection = await db.connect();
    connection.query(sql, values);

    connection.release();
  } catch (error) {
    console.log('EventEmitter some error occurred', error);
  }
});

export const prepareAudit = (
  audit_action,
  audit_data,
  audit_error,
  audit_by
) => {
  let audit_status = 200;
  if (audit_error) {
    audit_status = 500;
  }

  let auditObj = new Audit(
    audit_action,
    audit_data,
    audit_status,
    audit_error,
    audit_by
  );
  eventEmitter.emit('audit', auditObj);
};
