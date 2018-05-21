import React from 'react';

const form = (props) => (
    <section className="form-elegant mt-5 container">
        <div className="card">
            <div className="card-body mx-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 text-left">
                        <p className="h4 text-center mb-4">{props.title}</p>

                        {props.children}

                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default form;