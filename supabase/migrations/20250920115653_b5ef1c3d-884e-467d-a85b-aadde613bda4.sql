-- Drop the existing overly restrictive policy
DROP POLICY "Contact messages are private" ON public.contact_messages;

-- Create a new policy that allows anyone to insert contact messages
-- but restricts reading to authenticated users only
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Create a policy that only allows authenticated users to read contact messages
-- This ensures privacy while allowing form submissions
CREATE POLICY "Only authenticated users can read contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (auth.role() = 'authenticated');