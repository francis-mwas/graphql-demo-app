import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import DotBackground from './components/ui/DotBackground.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache() /* Cache results after fetching */,
  credentials: 'include',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DotBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </DotBackground>
    </BrowserRouter>
  </React.StrictMode>
);
