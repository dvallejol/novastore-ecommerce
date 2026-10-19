// frontend/src/components/WhatsAppChatbot.jsx
import React, { useState } from 'react';

// Avatar 3D de alta calidad estilo asistente virtual con headset / diadema
const AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
// Alternativa estilo ilustración / 3D Memoji:
// const AVATAR_URL = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=NovaAssistant';

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: '🚚 ¿Hacen envíos a todo el país?',
    respuesta: '¡Sí! Realizamos envíos a nivel nacional en Colombia con cobertura en las principales ciudades (entrega de 24 a 48 horas).'
  },
  {
    pregunta: '💳 ¿Qué medios de pago manejan?',
    respuesta: 'Aceptamos tarjetas de crédito/débito, PSE, transferencias Bancolombia, Nequi, Daviplata y pago contra entrega en ciudades seleccionadas.'
  },
  {
    pregunta: '🛡️ ¿Tienen garantía los productos?',
    respuesta: 'Todos nuestros productos cuentan con garantía directa de 12 meses en tecnología y 3 meses en confección y calzado.'
  },
  {
    pregunta: '📦 ¿Cómo rastreo mi pedido?',
    respuesta: 'Una vez confirmada la compra en el carrito, te enviamos el número de guía por correo y puedes consultar el estado con nuestro soporte.'
  }
];

export const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      remitente: 'bot',
      texto: '¡Hola! 👋 Soy Nova, tu asesora virtual. ¿En qué te puedo asesorar hoy? Selecciona una pregunta rápida o escríbeme abajo.'
    }
  ]);
  const [textoInput, setTextoInput] = useState('');

  const NUMERO_WHATSAPP = '573242699355';

  const responderPregunta = (p, r) => {
    setMensajes((prev) => [
      ...prev,
      { remitente: 'usuario', texto: p },
      { remitente: 'bot', texto: r }
    ]);
  };

  const handleEnviarTexto = (e) => {
    e.preventDefault();
    if (!textoInput.trim()) return;

    const consulta = textoInput.trim();
    const consultaMin = consulta.toLowerCase();

    let respuestaBot = 'Entiendo perfectamente tu consulta. Para brindarte una atención personalizada inmediata, conversemos directamente por WhatsApp.';

    if (consultaMin.includes('envio') || consultaMin.includes('entrega') || consultaMin.includes('flete')) {
      respuestaBot = 'Hacemos envíos rápidos a toda Colombia. Por compras superiores a $150.000 COP tu envío es completamente gratis.';
    } else if (consultaMin.includes('pago') || consultaMin.includes('nequi') || consultaMin.includes('tarjeta') || consultaMin.includes('pse')) {
      respuestaBot = 'Recibimos todos los medios digitales: Tarjeta de crédito, PSE, Nequi y Daviplata sin recargo.';
    } else if (consultaMin.includes('garantia') || consultaMin.includes('cambio') || consultaMin.includes('devolucion')) {
      respuestaBot = 'Cuentas con 12 meses de garantía oficial en tecnología y soporte directo con nuestro equipo.';
    }

    setMensajes((prev) => [
      ...prev,
      { remitente: 'usuario', texto: consulta },
      { remitente: 'bot', texto: respuestaBot }
    ]);
    setTextoInput('');
  };

  const abrirWhatsAppAsesor = () => {
    const ultimoMensaje = mensajes.filter(m => m.remitente === 'usuario').pop();
    const textoMensaje = ultimoMensaje 
      ? `¡Hola NovaStore! Estuve en la web y requiero asesoría sobre: "${ultimoMensaje.texto}"`
      : '¡Hola NovaStore! Deseo recibir asesoría sobre los productos de la tienda.';
    
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(textoMensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-widget-container">
      {/* Ventana de Chat */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="avatar-header-box">
                <img src={AVATAR_URL} alt="Asesora Nova" className="chat-avatar-img" />
                <span className="online-indicator"></span>
              </div>
              <div>
                <h4>Nova — Asesora Virtual</h4>
                <small>Asistencia IA activa</small>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chat-body">
            {mensajes.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.remitente}`}>
                <p>{m.texto}</p>
              </div>
            ))}

            <div className="faq-chips-container">
              <p className="faq-hint">Preguntas frecuentes:</p>
              {PREGUNTAS_FRECUENTES.map((faq, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="faq-chip"
                  onClick={() => responderPregunta(faq.pregunta, faq.respuesta)}
                >
                  {faq.pregunta}
                </button>
              ))}
            </div>
          </div>

          {/* Footer con input y redirección a WhatsApp */}
          <div className="chat-footer">
            <form onSubmit={handleEnviarTexto} className="chat-input-row">
              <input
                type="text"
                placeholder="Escribe tu pregunta..."
                value={textoInput}
                onChange={(e) => setTextoInput(e.target.value)}
              />
              <button type="submit" className="chat-send-btn">➤</button>
            </form>

            <button type="button" onClick={abrirWhatsAppAsesor} className="btn-whatsapp-direct">
              <span>💬</span> Hablar con asesor humano en WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante con el Avatar de la asesora */}
      <div className="avatar-trigger-wrapper">
        {!isOpen && (
          <div className="avatar-tooltip" onClick={() => setIsOpen(true)}>
            <span>¿En qué te ayudo? 👋</span>
          </div>
        )}
        <button 
          className="whatsapp-float-btn avatar-mode" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir Asistente Virtual"
        >
          <img src={AVATAR_URL} alt="Asesora Nova" className="avatar-float-img" />
          <span className="wa-mini-badge">💬</span>
          <span className="wa-pulse"></span>
        </button>
      </div>
    </div>
  );
};