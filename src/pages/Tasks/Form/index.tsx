import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';

interface ITask{
    title: string;
    description: string;
}

  const Form: React.FC = () => {

    const navigate = useNavigate();
    const {id}= useParams();

    const [model, setModel] = useState<ITask>({
        title: '',
        description: '',
    });

   useEffect(() => {
       findTask(id);
    }, [id]);

    function back(){
      navigate(-1);
    }

    function updateModel(e: ChangeEvent<HTMLInputElement>){
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        const response = id
        ? await api.put(`/tasks/${id}`, model)
        : await api.post('/tasks', model);
        back();
    }

    async function findTask(id?: string){
      if(!id) return;
      const response = await api.get(`/tasks/${id}`);
      setModel({
        title: response.data.title,
        description: response.data.description,
      });
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
                <h1>Nova Tarefa</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
                <BootstrapForm onSubmit={onSubmit}>
                  <BootstrapForm.Group>
                    <BootstrapForm.Label>Título</BootstrapForm.Label>
                    <BootstrapForm.Control
                      type="text"
                      name="title"
                      value={model.title}
                      onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)}
                      placeholder="Digite o título" />
                  </BootstrapForm.Group>
                  <BootstrapForm.Group>
                    <BootstrapForm.Label>Descrição</BootstrapForm.Label>
                    <BootstrapForm.Control
                      type="text"
                      name="description"
                      value={model.description}
                      onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)}
                      placeholder="Entre com a descrição" />
                  </BootstrapForm.Group>
                  <Button variant="dark" type="submit">Salvar</Button>
                </BootstrapForm>

            <br />
        </div>
    );
}

export default Form;
