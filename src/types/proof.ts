/* Lifted verbatim from the design-system ProofLabel contract. Five patterns reference it.
   Every consumer MUST render a text label alongside the status: colour never carries meaning
   on its own (constitution Principle IV). */
export type ProofStatus =
  | 'source'
  | 'owner'
  | 'permission'
  | 'answer'
  | 'gap'
  | 'human'
  | 'change'
  | 'operated'
  | 'neutral';
