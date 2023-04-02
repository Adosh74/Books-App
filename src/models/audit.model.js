class Audit {
  constructor(
    audit_action,
    audit_data,
    audit_status,
    audit_error,
    audit_by
  ) {
    this.audit_action = audit_action;
    this.audit_data = audit_data;
    this.audit_error = audit_error;
    this.audit_status = audit_status;
    this.audit_by = audit_by;
  }
}

export default Audit;
