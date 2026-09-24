/**
 * Builds a prefilled mailto: URI from contact-form fields.
 * Pure function — easy to unit test and swap for Formspree/EmailJS later.
 */
export function buildMailtoUri({ name, email, subject, message }, recipient) {
  const body = `Hi Rajapandu,\n\n${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`;
  const params = new URLSearchParams({
    subject: subject.trim() || 'Contact via portfolio',
    body,
  });
  return `mailto:${recipient}?${params.toString()}`;
}