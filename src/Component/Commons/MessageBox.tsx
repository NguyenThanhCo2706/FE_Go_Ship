const MessageBox = (props: any) => {
  return (
    <>
      <div className="modal active">
        <div
          className="d-flex flex-column flex-wrap align-content-center flex-wrap align-items-center position-relative bg-white p-5 layout-boder"
          onClick={e => e.stopPropagation()}
        >
          <h2>{props.title}</h2>
          <h1><i className={props.icon}></i></h1>
          <span className="fw-lighter m-2">{props.message}</span>
          <span>{props.aaa}</span>
          <button
            onClick={props.handleAcceptError}
            className="btn btn-primary"
          >Xác nhận</button>
        </div>
      </div>
    </>
  )
}

export default MessageBox