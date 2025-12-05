import React from 'react'
import './Premium.css'
import { IoSparkles, IoCheckmarkCircle, IoRocket } from 'react-icons/io5'

export default function Premium() {
  const plans = [
    {
      id: 'monthly',
      title: 'Monthly',
      price: '$9.99',
      period: '/month',
      icon: <IoSparkles />,
      features: [
        'Unlimited likes',
        'Boost once a week',
        'See who liked you',
        'Rewind last swipe',
        'Ad-free experience'
      ]
    },
    {
      id: 'yearly',
      title: 'Yearly',
      price: '$59.99',
      period: '/year',
      popular: true,
      icon: <IoRocket />,
      features: [
        'Everything in monthly',
        '5 boosts per month',
        'Priority ranking',
        'Advanced filters',
        'Read receipts',
        'Save 50%'
      ]
    },
  ]

  return (
    <div className="page container premium-page">
      <div className="premium-header">
        <IoSparkles size={48} color="var(--primary)" />
        <h2>Upgrade to Premium</h2>
        <p className="muted">Get more matches and stand out from the crowd</p>
      </div>

      <div className="plans-grid">
        {plans.map(p => (
          <div key={p.id} className={`card pricing-card ${p.popular ? 'popular' : ''}`}>
            {p.popular && <div className="popular-badge">Most Popular</div>}
            <div className="plan-icon">{p.icon}</div>
            <h3>{p.title}</h3>
            <div className="price-wrapper">
              <div className="price">{p.price}</div>
              <div className="period">{p.period}</div>
            </div>
            <ul className="features-list">
              {p.features.map(f => (
                <li key={f}>
                  <IoCheckmarkCircle size={20} color="var(--primary)" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className="btn primary full-width">Choose Plan</button>
          </div>
        ))}
      </div>

      <div className="premium-footer">
        <p className="muted">All plans auto-renew. Cancel anytime.</p>
      </div>
    </div>
  )
}
