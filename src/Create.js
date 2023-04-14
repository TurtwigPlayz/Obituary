import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


    const createObituaries = async (image, Name, Birth, Death) => {
        setLoading(true);
        if (!image){
          alert("No image was selected")
          setLoading(false);
          return
        }
        if (Name===""){
          alert("No Name was selected")
          setLoading(false);
          return
        }
        if (Birth===""){
          alert("No Birth Date was selected")
          setLoading(false);
          return
        }
        if (Death===""){
          alert("No Death Date was selected")
          setLoading(false);
          return
        }
        const Header = {
          name:Name,
          birth:Birth,
          death:Death
        }
        console.log(Header)
        const formdata=new FormData();
        formdata.append("file", image);
        const response = await fetch("https://swtevkjvrdwb4sbhqevq57lz4y0ypgqh.lambda-url.ca-central-1.on.aws/",{
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            ...Header
          },
          body: formdata//JSON.stringify(body)
        });
        console.log(response);
        setBirthDate("");
        setDeathDate("");
        setImage();
        setDedName("");
        await getObituaries();
        setLoading(false);
        handleClose();
      }
    return (
        <>
      <Modal show={show} onHide={handleClose}  fullscreen={true} style={{opacity: 0.8}}  centered>
        <Modal.Header className='border-0' closeButton>
        </Modal.Header>
        <Modal.Body className=" mx-auto vstack">
            <div className='my-auto'>
            <Modal.Title >Create New Obituary</Modal.Title>
                <Form.Group controlId="formFile" className="mb-3 d-flex flex-column">
                    <Form.Label>Upload photo of Deceased</Form.Label>
                    <input className='custom-file-input' onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/*"></input>
                </Form.Group>


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch('https://bhakaiz7jjw6pjou7qmy6gybqy0ohbrr.lambda-url.ca-central-1.on.aws/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        birth,
        death,
        obituary,
        image,
        polly
      })
    })
    .then(() => {
      getObituaries();
      setIsLoading(false);
      handleClose();
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsLoading(false);
    });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Obituary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBirth">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control required type="text" placeholder="Enter birth date" value={birth} onChange={(e) => setBirth(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formDeath">
            <Form.Label>Death Date</Form.Label>
            <Form.Control required type="text" placeholder="Enter death date" value={death} onChange={(e) => setDeath(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formObituary">
            <Form.Label>Obituary</Form.Label>
            <Form.Control required as="textarea" rows={3} placeholder="Enter obituary" value={obituary} onChange={(e) => setObituary(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control required type="text" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPolly">
            <Form.Label>Polly URL</Form.Label>
            <Form.Control required type="text" placeholder="Enter Polly URL" value={polly} onChange={(e) => setPolly(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Create;