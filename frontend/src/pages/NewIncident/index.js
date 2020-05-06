import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.css'

export default () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')


    async function handleNewIncident(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            console.log(response)

            history.push('/profile')
        } catch {
            alert('Erro ao cadastrar caso. Tente novamente.')
        }
    }

    return (
        <div className="new-inicident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/"></Link>
                    <button type="button">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </button>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Título do Caso" />
                    <textarea type="email" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Descrição" />
                    <input 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Valor em reais" />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}