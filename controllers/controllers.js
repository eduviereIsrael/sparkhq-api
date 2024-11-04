require('dotenv').config();
const express = require('express');
const https = require('https');
const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);

const SendGrid = {
    addNewUsertoContacts : (req, res) => {
        // console.log(process.env.SENDGRID_API_KEY)
        try{
            const data = {
                "contacts": [
                  {
                    "email": req.body.email,
                    "custom_fields": {
                        "userId": req.body.userId,
                        
                    }
                    
                  }
                ]
            }

              
            const request = {
                url: `/v3/marketing/contacts`,
                method: 'PUT',
                body: data
            }
            client.request(request)
                .then(([response, body]) => {
                    // console.log(response.statusCode);
                    // console.log(response.body);

                    res.status(200).json({
                        status: "ok",
                        message: "successfully added",
                        data: body
                    })
                })
                .catch(error => {
                    console.error(error.body.errors);
                });
           
        } catch(error){
            console.error(error)
            res.status(400).json({
                status: "failed",
                message: "error while adding email to contacts"
            })
            
        }
    },
    verifyEmail: (req, res) => {
        try {
            const data = {
                from: {
                    email: "admin@sparkhq.io"
                },
                personalizations: [
                    {
                        to: [
                            {
                                email: req.body.toEmail
                            }
                        ],
                        dynamic_template_data: {
                            url: req.body.url,
                            name: req.body.name,
                        }
                    }
                ],
                template_id: 'd-60273bf146a04d7a95cfc1a330895e68'
            };
        
            const request = {
                url: `/v3/mail/send`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            };
        
            client.request(request)
                .then(([response, body]) => {
                    res.status(200).json({
                        status: "ok",
                        message: "Email successfully sent",
                        data: body
                    });
                })
                .catch(error => {
                    console.error(error.body.errors);
                    res.status(400).json({
                        status: "failed",
                        message: "Error sending email",
                        errors: error.body.errors
                    });
                });
        
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "failed",
                message: "Server error while sending email"
            });
        }
        
    },
    welcomeEmail: (req, res) => {
        try {
            const data = {
                from: {
                    email: "admin@sparkhq.io"
                },
                personalizations: [
                    {
                        to: [
                            {
                                email: req.body.toEmail
                            }
                        ]
                        // dynamic_template_data: {
                        //     url: req.body.url,
                        //     name: req.body.name,
                        // }
                    }
                ],
                template_id: 'd-d2a98db90513488f9076a6f462b4150f'
            };
        
            const request = {
                url: `/v3/mail/send`,
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            };
        
            client.request(request)
                .then(([response, body]) => {
                    res.status(200).json({
                        status: "ok",
                        message: "Email successfully sent",
                        data: body
                    });
                })
                .catch(error => {
                    console.error(error.body.errors);
                    res.status(400).json({
                        status: "failed",
                        message: "Error sending email",
                        errors: error.body.errors
                    });
                });
        
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "failed",
                message: "Server error while sending email"
            });
        }
        
    },
    testConnect: (req, res) => {
        res.status(200).json({
            status: "ok",
            message: "Connected to SendGrid"
        });
    }
}

module.exports = SendGrid