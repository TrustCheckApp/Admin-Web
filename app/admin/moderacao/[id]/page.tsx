'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getModerationCase, approveCase, rejectCase, type ModerationCase } from '@/lib/api/moderation';
import { FeedbackBox } from '@/components/feedback/FeedbackBox';

export default function ModerationCaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [state, setState] = useState<'loading' | 'error' | 'success'>('loading');
  const [caseDetail, setCaseDetail] = useState<ModerationCase | null>(null);
  const [showModal, setShowModal] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');
  const [reason, setReason] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCaseDetail();
  }, [id]);

  async function fetchCaseDetail() {
    setState('loading');
    try {
      const data = await getModerationCase(id);
      setCaseDetail(data);
      setState('success');
    } catch (error) {
      setState('error');
    }
  }

  async function handleApprove() {
    if (!caseDetail) return;

    setSubmitState('loading');
    setMessage('');

    try {
      await approveCase(caseDetail.id, comment || undefined);
      setSubmitState('success');
      setMessage('Caso aprovado com sucesso.');
      setTimeout(() => {
        router.push('/admin/moderacao');
      }, 1000);
    } catch (error) {
      setSubmitState('error');
      setMessage(error instanceof Error ? error.message : 'Erro ao aprovar caso.');
    }
  }

  async function handleReject() {
    if (!caseDetail || !reason.trim()) {
      setMessage('Motivo obrigatório para rejeição.');
      return;
    }

    setSubmitState('loading');
    setMessage('');

    try {
      await rejectCase(caseDetail.id, reason);
      setSubmitState('success');
      setMessage('Caso rejeitado com sucesso.');
      setTimeout(() => {
        router.push('/admin/moderacao');
      }, 1000);
    } catch (error) {
      setSubmitState('error');
      setMessage(error instanceof Error ? error.message : 'Erro ao rejeitar caso.');
    }
  }

  if (state === 'loading') {
    return (
      <div className="container">
        <FeedbackBox type="loading" message="Carregando caso..." />
      </div>
    );
  }

  if (state === 'error' || !caseDetail) {
    return (
      <div className="container">
        <FeedbackBox type="error" message="Erro ao carregar caso. Tente novamente." />
        <button onClick={() => router.push('/admin/moderacao')}>Voltar para fila</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Detalhe do Caso: {caseDetail.publicId}</h1>
        <button onClick={() => router.push('/admin/moderacao')}>Voltar</button>
      </div>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div>
          <strong>Empresa:</strong> {caseDetail.companyName}
        </div>
        <div>
          <strong>Consumidor:</strong> {caseDetail.consumerDisplayName}
        </div>
        <div>
          <strong>Categoria:</strong> {caseDetail.category}
        </div>
        <div>
          <strong>Status:</strong> {caseDetail.status}
        </div>
        <div>
          <strong>Descrição:</strong>
          <p>{caseDetail.description}</p>
        </div>
      </div>

      {caseDetail.evidences.length > 0 && (
        <div className="card" style={{ display: 'grid', gap: 12 }}>
          <h2>Evidências</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {caseDetail.evidences.map((evidence) => (
              <div key={evidence.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                {evidence.type === 'image' ? (
                  <img src={evidence.url} alt="Evidência" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                ) : (
                  <a href={evidence.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 16, textAlign: 'center' }}>
                    📄 {evidence.url.split('/').pop()}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {caseDetail.moderationHistory.length > 0 && (
        <div className="card" style={{ display: 'grid', gap: 12 }}>
          <h2>Histórico de Moderação</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                <th style={{ padding: 8 }}>Moderador</th>
                <th style={{ padding: 8 }}>Decisão</th>
                <th style={{ padding: 8 }}>Motivo</th>
                <th style={{ padding: 8 }}>Data</th>
              </tr>
            </thead>
            <tbody>
              {caseDetail.moderationHistory.map((history) => (
                <tr key={history.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: 8 }}>{history.adminName}</td>
                  <td style={{ padding: 8 }}>{history.decision === 'approved' ? 'Aprovado' : 'Rejeitado'}</td>
                  <td style={{ padding: 8 }}>{history.reason || '-'}</td>
                  <td style={{ padding: 8 }}>{new Date(history.timestamp).toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => setShowModal('approve')}
          style={{ backgroundColor: '#10b981', color: '#fff', padding: 12, borderRadius: 8 }}
        >
          Aprovar
        </button>
        <button
          onClick={() => setShowModal('reject')}
          style={{ backgroundColor: '#ef4444', color: '#fff', padding: 12, borderRadius: 8 }}
        >
          Rejeitar
        </button>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, maxWidth: 500, width: '100%', display: 'grid', gap: 16 }}>
            <h2>{showModal === 'approve' ? 'Aprovar Caso' : 'Rejeitar Caso'}</h2>

            {showModal === 'approve' && (
              <div>
                <label>Comentário interno (opcional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Adicione um comentário opcional..."
                  style={{ width: '100%', minHeight: 100, padding: 8 }}
                />
              </div>
            )}

            {showModal === 'reject' && (
              <div>
                <label>Motivo (obrigatório)</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  style={{ width: '100%', padding: 8, marginBottom: 8 }}
                >
                  <option value="">Selecione um motivo...</option>
                  <option value="content_inappropriate">Conteúdo inapropriado</option>
                  <option value="insufficient_evidence">Evidências insuficientes</option>
                  <option value="duplicate">Caso duplicado</option>
                  <option value="policy_violation">Violação de política</option>
                  <option value="other">Outro</option>
                </select>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Descreva o motivo em detalhes..."
                  style={{ width: '100%', minHeight: 100, padding: 8 }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  setShowModal(null);
                  setComment('');
                  setReason('');
                  setMessage('');
                }}
                style={{ flex: 1, padding: 8 }}
              >
                Cancelar
              </button>
              <button
                onClick={showModal === 'approve' ? handleApprove : handleReject}
                disabled={submitState === 'loading'}
                style={{
                  flex: 1,
                  padding: 8,
                  backgroundColor: showModal === 'approve' ? '#10b981' : '#ef4444',
                  color: '#fff',
                }}
              >
                {submitState === 'loading' ? 'Processando...' : showModal === 'approve' ? 'Aprovar' : 'Rejeitar'}
              </button>
            </div>

            {message && <FeedbackBox type={submitState === 'error' ? 'error' : 'success'} message={message} />}
          </div>
        </div>
      )}
    </div>
  );
}
